import { PartialType } from '@nestjs/mapped-types';
import { CreateUiKitDto } from './create-ui-kit.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUiKitDto extends PartialType(CreateUiKitDto) {
	@ApiProperty({ example: 'UI Kit 1' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'Description' })
	@IsOptional()
	@IsString()
	description: string;

	@ApiProperty({example: null, type: "number", required: false})
    @IsOptional()
    @IsNumber()
    parentId?: number
}
