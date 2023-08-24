import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTemplateDto {
  @ApiProperty({example: "Template 1"})
  @IsString()
  name: string;

  @ApiProperty({example: 100})
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({example: "Component description"})
  @IsString()
  @IsOptional()
  description: string;
}