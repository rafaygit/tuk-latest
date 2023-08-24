import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubCategoryDto {
    @ApiProperty({ description: 'Name of the subcategory' })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({ description: 'Description of subcategory' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'ID of the parent category' })
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    parentId: number;
}