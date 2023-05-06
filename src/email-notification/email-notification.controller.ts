import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailNotificationService } from './email-notification.service';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';

@Controller('email-notification')
export class EmailNotificationController {
  constructor(private readonly emailNotificationService: EmailNotificationService) {}

  @Post('send-email')
  create(@Body() dto: SendEmailNotificationDto) {
    return this.emailNotificationService.sendEmail(dto);
  }
}
