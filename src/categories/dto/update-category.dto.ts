import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString,  } from "class-validator";
import { Transform } from 'class-transformer';

export class UpdateCategoryDto {
    @ApiProperty({example: "sample category"})
    @IsOptional()
    name?: string;

    @ApiProperty({example: 1, required: false})
    @Transform(({ value }) => Number(value))
    @IsOptional()
    uiKitId?: number;

    @ApiProperty({ description: 'Description of subcategory' })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({example: 1, required: false})
    @Transform(({ value }) => Number(value))
    @IsOptional()
    parentId?: number;
}