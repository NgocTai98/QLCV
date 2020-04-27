import { IsString } from "class-validator";

export class InfoQuanCredentialsDto {
    @IsString()
    name: string
}