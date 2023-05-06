import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailNotificationModule } from './email-notification/email-notification.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EmailNotificationModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
