import { IsString } from "class-validator";

export class EducationCredentialsDto {
    @IsString()
    location: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;

}