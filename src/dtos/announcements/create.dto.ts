import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAnnouncementDTO {
   
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    link: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsDate()
    date: Date = new Date()
}