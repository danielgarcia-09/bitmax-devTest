import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class FilterDTO {

    @IsString()
    @IsOptional()
    search: string = ""

    @IsOptional()
    dateRange: { from: "", to: "" }

    @IsNumber()
    @IsPositive()
    @IsOptional()
    skip: number = 1

    @IsNumber()
    @IsPositive()
    @IsOptional()
    take: number = 10

    @IsString()
    @IsOptional()
    orderBy: "ASC" | "DESC" = "ASC"
}