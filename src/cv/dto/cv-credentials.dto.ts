import { IsString, IsDate } from "class-validator";

export class CvCredentialsDto {
    @IsString()
    hashTag: string;

   
    titleId: any;

}