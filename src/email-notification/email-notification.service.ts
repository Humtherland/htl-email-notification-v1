import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';
import { EmailNotificationModule } from './email-notification.module';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailNotificationService {
  async sendEmail(dto: SendEmailNotificationDto) { return "TO IMPLEMENT"; }
}
