import { IsString } from "class-validator";

export class TitleCredentialsDto {
    @IsString()
    companyName: string;

    @IsString()
    address: string;

    @IsString()
    linkWeb: string;

    @IsString()
    phone: string;
}