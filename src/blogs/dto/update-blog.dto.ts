import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { BlogTypes } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
	@ApiProperty({ example: 'Entered title here' })
	@IsString()
	title: string;

	@ApiProperty({ example: 'OTHERS' })
	@IsEnum(BlogTypes)
	type: BlogTypes;

	@ApiProperty({ example: 'sub-title' })
	@IsString()
	subTitle: string;

	@ApiProperty({ example: 'Entered content here!' })
	@IsString()
	content: string;
}
