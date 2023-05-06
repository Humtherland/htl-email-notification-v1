import { Module } from '@nestjs/common';
import { EmailNotificationService } from './email-notification.service';
import { EmailNotificationController } from './email-notification.controller';

@Module({
  controllers: [EmailNotificationController],
  providers: [EmailNotificationService]
})
export class EmailNotificationModule {
  static host:string;
  static port:string;
  static user:string;
  static password:string;

  constructor() {
    EmailNotificationModule.host = process.env.SMTP_HOST;
    EmailNotificationModule.port = process.env.SMTP_PORT;
    EmailNotificationModule.user = process.env.SMTP_USER;
    EmailNotificationModule.password = process.env.SMTP_PASSWORD;
  }
}
