import { IsString, MinLength, MaxLength, IsInt, IsNumber,  } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    email: string;
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    password: string;
    // @IsString()
    // @MinLength(4)
    // @MaxLength(50)
    fullname: string;
    // @IsNumber()
    level: number;
    // @IsString()
    rememberToken: string;
}