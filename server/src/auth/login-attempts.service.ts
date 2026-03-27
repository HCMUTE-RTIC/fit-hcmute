import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AttemptState {
  count: number;
  firstAttemptAt: number;
  blockedUntil?: number;
}

@Injectable()
export class LoginAttemptsService {
  private readonly ipAttempts = new Map<string, AttemptState>();
  private readonly accountAttempts = new Map<string, AttemptState>();
  private readonly ipMaxAttempts: number;
  private readonly accountMaxAttempts: number;
  private readonly windowMs: number;
  private readonly blockMs: number;

  constructor(private readonly configService: ConfigService) {
    this.ipMaxAttempts = this.configService.get<number>(
      'LOGIN_RATE_LIMIT_IP_MAX_ATTEMPTS',
      10,
    );
    this.accountMaxAttempts = this.configService.get<number>(
      'LOGIN_RATE_LIMIT_ACCOUNT_MAX_ATTEMPTS',
      5,
    );
    this.windowMs = this.configService.get<number>(
      'LOGIN_RATE_LIMIT_WINDOW_MS',
      15 * 60 * 1000,
    );
    this.blockMs = this.configService.get<number>(
      'LOGIN_RATE_LIMIT_BLOCK_MS',
      15 * 60 * 1000,
    );
  }

  assertCanAttempt(ip: string, email: string) {
    this.cleanupExpired(this.ipAttempts, ip);
    this.cleanupExpired(this.accountAttempts, email);

    const retryAfterMs = Math.max(
      this.getRetryAfterMs(this.ipAttempts.get(ip)),
      this.getRetryAfterMs(this.accountAttempts.get(email)),
    );

    if (retryAfterMs > 0) {
      throw new HttpException(
        {
          success: false,
          message: `Too many login attempts. Try again in ${Math.ceil(
            retryAfterMs / 1000,
          )} seconds.`,
          errorCode: 'AUTH_429',
          retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  recordFailure(ip: string, email: string) {
    this.bump(this.ipAttempts, ip, this.ipMaxAttempts);
    this.bump(this.accountAttempts, email, this.accountMaxAttempts);
  }

  recordSuccess(ip: string, email: string) {
    this.ipAttempts.delete(ip);
    this.accountAttempts.delete(email);
  }

  private bump(
    store: Map<string, AttemptState>,
    key: string,
    maxAttempts: number,
  ) {
    const now = Date.now();
    const state = store.get(key);

    if (!state || now - state.firstAttemptAt > this.windowMs) {
      store.set(key, { count: 1, firstAttemptAt: now });
      return;
    }

    state.count += 1;
    if (state.count >= maxAttempts) {
      state.blockedUntil = now + this.blockMs;
    }
    store.set(key, state);
  }

  private cleanupExpired(store: Map<string, AttemptState>, key: string) {
    const state = store.get(key);
    if (!state) return;

    const now = Date.now();
    if (
      (state.blockedUntil && state.blockedUntil <= now) ||
      now - state.firstAttemptAt > this.windowMs
    ) {
      store.delete(key);
    }
  }

  private getRetryAfterMs(state?: AttemptState) {
    if (!state?.blockedUntil) return 0;
    return Math.max(0, state.blockedUntil - Date.now());
  }
}
