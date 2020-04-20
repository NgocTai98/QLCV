import { IsString } from "class-validator";

export class EducationCredentialsDto {
    @IsString()
    location?: string;

    startTime?: string;

    endTime?: string;

    employee: number;
    
    user: number;
}