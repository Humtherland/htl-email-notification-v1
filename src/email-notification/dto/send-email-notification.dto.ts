import { IsEmail, IsNotEmpty } from "class-validator";

export class SendEmailNotificationDto {
	@IsNotEmpty()
    @IsEmail()
	to: string;

	@IsNotEmpty()
	subject: string;

	@IsNotEmpty()
	text: string;

}
