import { PartialType } from '@nestjs/mapped-types';
import { CreateLicenseDto } from './create-license.dto';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateLicenseDto extends PartialType(CreateLicenseDto) {
	@ApiProperty({ example: 'Premium License' })
	@Type(() => String)
	name: string;

	@ApiProperty({ example: 200 })
	@IsNumber()
	@Type(() => Number)
	price: number;

	@ApiProperty({ example: 'Description' })
	@IsOptional()
	@IsString()
	description: string;
}
