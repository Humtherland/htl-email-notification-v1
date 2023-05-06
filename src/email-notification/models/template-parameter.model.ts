import { IsNotEmpty, IsString } from "class-validator";

export class TemplateParameter {
	@IsNotEmpty()
    @IsString()
	key: string;

	@IsNotEmpty()
    @IsString()
	value: string;

}
