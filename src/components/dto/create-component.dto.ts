import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ComponentAccessType, ComponentTags } from '@prisma/client';

export class CreateComponentDto {
  @ApiProperty({example: 1})
  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @ApiProperty({example: "Component 1"})
  @IsString()
  name: string;

  @ApiProperty({example: "Component description"})
  @IsString()
  @IsOptional()
  description?: string;

	@ApiProperty({ example: 'PAID' })
	@IsEnum(ComponentAccessType)
	accessType: ComponentAccessType;

  @ApiProperty({ example: 'NEW' })
	@IsEnum(ComponentTags)
	tag: ComponentTags;


}
