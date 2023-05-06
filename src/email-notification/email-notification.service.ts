import { EmailNotificationModule } from './email-notification.module';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';
import { TemplateParameter } from './models/template-parameter.model';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

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

      const html = await this.getTemplateParametrized(dto.templateCode, dto.templateParameters);

      const mensaje = {
        to: dto.to,
        subject: dto.subject,
        html: html
      }

      let transporter:any = nodemailer.createTransport(config);
      let info = await transporter.sendMail(mensaje);
      return info;
    } catch (error) {
      this.errorHandler(error);
    }
  }
  
  async getTemplateParametrized(templateCode: string, templateParameters: TemplateParameter[]) {
    let template = await this.getTemplate(templateCode);

    templateParameters.forEach((parameter: TemplateParameter) => {
      template = template.replace(`{{${parameter.key}}}`, parameter.value);
    });

    return template;
  }
  
  async getTemplate(templateCode: string) {
    if (templateCode === "NOTEMPLATE") return "{{VARNOTEMPLATE}}";
    else return await fs.readFileSync(this.minifiedName(templateCode), 'utf8')
  }

  minifiedName(filePath: string) {
    return path.join('.','uploads', filePath +'.min.html');
}

  private errorHandler( error: any ): any {
    if (error.errno == '-4078') throw new InternalServerErrorException('Error de conexión con el servidor de correo.');
  }
}
