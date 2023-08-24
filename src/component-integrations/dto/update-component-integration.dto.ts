import { PartialType } from '@nestjs/swagger';
import { CreateComponentIntegrationDto } from './create-component-integration.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntegrationTypes } from '@prisma/client';
export class UpdateComponentIntegrationDto extends PartialType(CreateComponentIntegrationDto) {
	@ApiProperty({ example: 'Framework Name' })
	@IsString()
	type: IntegrationTypes;

	@ApiProperty({ example: 'Framework Code' })
	@IsString()
	markup: string;

	@ApiProperty({ example: 'Framework Code JS' })
	@IsOptional()
	@IsString()
	codeJS: string;
}
