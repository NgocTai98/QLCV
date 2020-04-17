import { IsString, MinLength } from "class-validator";

export class QuanlificationCredentialsDto {
    @IsString()
    @MinLength(4)
    name: string;

    employee: number;
    
    user: number;
}