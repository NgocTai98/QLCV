import { IsString } from "class-validator";

export class HistoryCredentialsDto {

    @IsString()
    time: string
}