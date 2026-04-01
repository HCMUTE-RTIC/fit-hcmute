import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const method = request.method;

    // Only log data mutation requests
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle();
    }

    // Attempt to resolve User ID from JwtAuthGuard payload
    const user = (request as any).user;
    if (!user || (!user.sub && !user.id)) {
      // If there's no authenticated user, we skip (e.g. login, public interactions)
      return next.handle();
    }

    const userId = user.id || user.sub;

    let action = '';
    if (method === 'POST') action = 'CREATE';
    else if (method === 'PUT' || method === 'PATCH') action = 'UPDATE';
    else if (method === 'DELETE') action = 'DELETE';

    const pathParts = request.path.replace('/api/', '').split('/');
    const cleanPath = pathParts[0];
    const entity = cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1); // e.g., 'Articles', 'Albums'

    const newValues = method === 'DELETE' ? null : request.body;
    const xForwardedFor = request.headers['x-forwarded-for'];
    let ipAddress =
      request.ip ||
      (Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor) ||
      null;
    if (ipAddress && ipAddress.includes(':')) {
      ipAddress = ipAddress.split(':').pop() || ipAddress; // Basic IPv4 cleanup
    }

    return next.handle().pipe(
      tap({
        next: (responseData) => {
          // Attempt to extract entity ID (for creations it's in the response, for updates/deletes in params)
          const rawId =
            method === 'POST'
              ? responseData?.id || responseData?.data?.id
              : request.params.id;
          let entityId: string | null = null;

          if (rawId) {
            entityId = Array.isArray(rawId) ? rawId[0] : String(rawId);
          }

          // In case we can't find an exact entity ID, we try not to crash but fallback
          // 'UNKNOWN_ID' could violate Prisma type (UUID), so we might just skip if really missing,
          // though most of our endpoints return `id` properly.
          if (entityId) {
            void this.saveAuditLog(
              userId,
              action,
              entity,
              entityId,
              newValues,
              ipAddress?.slice(0, 45) || null, // Keep length safe for VarChar(45)
            );
          }
        },
        error: () => {
          // Only log successful mutations; failure captures can be added if needed.
        },
      }),
    );
  }

  private async saveAuditLog(
    userId: string,
    action: string,
    entity: string,
    entityId: string,
    newValues: any,
    ipAddress: string | null,
  ) {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId,
          action,
          entity,
          entityId,
          newValues,
          ipAddress,
        },
      });
    } catch (err) {
      console.error('❌ Failed to save Audit Log:', err);
    }
  }
}
