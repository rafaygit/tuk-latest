import { ApiProperty } from '@nestjs/swagger';
import { BlogTypes } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
export class CreateBlogDto {
	@ApiProperty({ example: 'OTHERS' })
	@IsEnum(BlogTypes)
	type: BlogTypes;

	@ApiProperty({ example: 'Entered title here' })
	@IsString()
	title: string;

	@ApiProperty({ example: 'sub-title' })
	@IsString()
	subTitle: string;

	@ApiProperty({ example: 'Entered content here!' })
	@IsString()
	content: string;
}
