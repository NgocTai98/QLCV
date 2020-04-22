import { IsString } from "class-validator";

export class CvProjectCredentialsDto {
    @IsString()
    responsibility: string;

    @IsString()
    technology: string;

    projectId: any;
}