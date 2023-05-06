import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';
import { EmailNotificationModule } from './email-notification.module';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailNotificationService {
  async sendEmail(dto: SendEmailNotificationDto) {
    try {
      const config = {
        host: EmailNotificationModule.host,
        port: EmailNotificationModule.port,
        auth: {
          user: EmailNotificationModule.user,
          pass: EmailNotificationModule.password
        }
      }
      const mensaje = {
        to: dto.to,
        subject: dto.subject,
        html: dto.text
      }

      let transporter:any = nodemailer.createTransport(config);
      let info = await transporter.sendMail(mensaje);
      return info;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  private errorHandler( error: any ): any {
    if (error.errno == '-4078') throw new InternalServerErrorException('Error de conexión con el servidor de correo.');
  }
}
