import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

const orderByOptions = ["ASC", "DESC"] as const;

export type OrderByOptions = typeof orderByOptions[number];

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

    @IsIn(orderByOptions)
    @IsOptional()
    orderBy: OrderByOptions
}