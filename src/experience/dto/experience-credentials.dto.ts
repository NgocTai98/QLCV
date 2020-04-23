import { IsString } from "class-validator";

export class ExperienceCredentialsDto {
    @IsString()
    location: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;

}