
import { IsString, MinLength, MaxLength } from "class-validator";

export class EmployeeCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    employeeCode: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    name: string;


    reference?: string;
    user?: number;
}