import { PartialType } from '@nestjs/swagger';
import { CreateTemplateIntegrationDto } from './create-template-integration.dto';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntegrationTypes } from '@prisma/client';
export class UpdateTemplateIntegrationDto extends PartialType(CreateTemplateIntegrationDto) {
	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	templateId?: number;

	@ApiProperty({ example: 'REACTJS' })
	@IsString()
	@IsOptional()
	type?: IntegrationTypes;

	
}
