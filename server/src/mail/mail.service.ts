import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  /**
   * Đẩy job gửi email cảm ơn vào Redis Queue.
   * Không chờ gửi xong – fire-and-forget.
   */
  async sendThankYouEmail(
    to: string,
    recipientName: string,
    formTitle: string,
  ): Promise<void> {
    try {
      await this.mailQueue.add(
        'thank-you',
        { to, recipientName, formTitle },
        {
          attempts: 3,
          backoff: { type: 'exponential', delay: 3000 },
          removeOnComplete: true,
          removeOnFail: false,
        },
      );
      this.logger.log(
        `📧 Queued thank-you email for ${to} (form: ${formTitle})`,
      );
    } catch (error) {
      // Lỗi push queue không được block response của user
      this.logger.error(`Failed to queue email for ${to}`, error);
    }
  }
}
