import { IsString } from "class-validator";

export class ExperienceCredentialsDto {
    @IsString()
    location?: string;

    startTime?: string;

    endTime?: string;

    employee: number;
    
    user: number;
}