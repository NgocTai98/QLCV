import { IsDate } from "class-validator";

export class HistoryCredentialsDto {

    @IsDate()
    time: string
}