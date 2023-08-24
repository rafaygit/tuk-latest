import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntegrationTypes } from '@prisma/client';

export class CreateTemplateIntegrationDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	@Type(() => Number)
	templateId: number;

	@ApiProperty({ example: 'REACTJS' })
	@IsString()
	type: IntegrationTypes;
}
