import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';
export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({ example: 'User' })
	@IsOptional()
	@IsString()
	firstName: string;

	@ApiProperty({ example: 'Test' })
	@IsOptional()
	@IsString()
	lastName: string;

	@ApiProperty({ example: 'test@email.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: '123' })
	@IsNotEmpty()
	password: string;

	role: UserRoles;
}
