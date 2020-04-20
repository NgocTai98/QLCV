import { IsString } from "class-validator";

export class ProjectCredentialsDto {
    @IsString()
    location: string;

    @IsString()
    projectName: string;

    @IsString()
    description: string;

    @IsString()
    technology: string;

    @IsString()
    reference: string;

}