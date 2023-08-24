import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntegrationTypes } from '@prisma/client';

export class CreateComponentIntegrationDto {
    @ApiProperty({ example: 1 })
	@IsNumber()
	@Type(() => Number)
	componentId: number;
	
	@ApiProperty({ example: 'REACTJS' })
	@IsEnum(IntegrationTypes)
	type: IntegrationTypes;
	
	@ApiProperty({ example: 'Framework Code' })
	@IsString()
	markup: string;
	
	@ApiProperty({ example: 'Framework Code JS' })
	@IsOptional()
	@IsString()
	codeJS: string;
}
