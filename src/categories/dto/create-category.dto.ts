import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ description: 'Name of the Category' })
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({ description: 'ID of the associated UI Kit' })
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    uiKitId: number;
}