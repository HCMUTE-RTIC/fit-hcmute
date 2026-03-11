import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { thankYouEmailHtml } from './mail.templates';

interface ThankYouJobData {
  to: string;
  recipientName: string;
  formTitle: string;
}

@Processor('mail')
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    super();
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: false, // true for 465, false for 587 (STARTTLS)
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'thank-you':
        await this.handleThankYouEmail(job.data as ThankYouJobData);
        break;
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleThankYouEmail(data: ThankYouJobData): Promise<void> {
    const { to, recipientName, formTitle } = data;
    const from = this.configService.get<string>(
      'SMTP_FROM',
      'Khoa CNTT - HCMUTE <noreply@fit.hcmute.edu.vn>',
    );

    this.logger.log(`📨 Sending thank-you email to ${to}...`);

    await this.transporter.sendMail({
      from,
      to,
      subject: `Cảm ơn ${recipientName} đã đồng hành cùng 25 Năm Khoa CNTT!`,
      html: thankYouEmailHtml(recipientName, formTitle),
    });

    this.logger.log(`✅ Thank-you email sent successfully to ${to}`);
  }
}
