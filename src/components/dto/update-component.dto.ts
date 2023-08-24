import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentDto } from './create-component.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ComponentAccessType, ComponentTags } from '@prisma/client';
export class UpdateComponentDto extends PartialType(CreateComponentDto) {
	@ApiProperty({ example: 1 })
	@IsOptional()
	categoryId?: number;

	@ApiProperty({ example: 'Component 1' })
	@IsOptional()
	name?: string;

	@ApiProperty({ example: 'Component description' })
	@IsOptional()
	description?: string;

	@ApiProperty({ example: 'PAID' })
	@IsEnum(ComponentAccessType)
	accessType: ComponentAccessType;

 	 @ApiProperty({ example: 'NEW' })
	@IsEnum(ComponentTags)
	tag: ComponentTags;

}
