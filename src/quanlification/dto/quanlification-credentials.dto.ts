import { IsString, MinLength } from "class-validator";

export class QuanlificationCredentialsDto {
    @IsString()
    name: string;

}