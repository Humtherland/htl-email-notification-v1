import { IsEmail, IsNotEmpty } from "class-validator";
import { TemplateParameter } from "../models/template-parameter.model";

export class SendEmailNotificationDto {
	@IsNotEmpty()
    @IsEmail()
	to: string;

	@IsNotEmpty()
	subject: string;

	@IsNotEmpty()
	templateCode: string;

	@IsNotEmpty()
	templateParameters: TemplateParameter[];

}
