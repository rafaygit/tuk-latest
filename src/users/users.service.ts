import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { UserRoles } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}
	create(createUserDto: CreateUserDto) {
		createUserDto.password = hashSync(createUserDto.password, 8);
		return this.prisma.users.create({
			data: createUserDto,
			include: {
				templates: true,
				licenses: true
			}
		});
	}
	createAdmin(createUserDto: CreateUserDto) {
		createUserDto.password = hashSync(createUserDto.password, 8);
		createUserDto.role = UserRoles.ADMIN;
		return this.prisma.users.create({
			data: createUserDto
		});
	}

	findUserRole() {
		return this.prisma.users.findMany({
			where: {
				role: UserRoles.USER
			},
			include: {
				templates: true,
				licenses: true
			}
		});
	}
	findAdminRole() {
		return this.prisma.users.findMany({
			where: {
				role: UserRoles.ADMIN
			},
			include: {
				templates: true,
				licenses: true
			}
		});
	}

	async findOne(id: number) {
		return await this.prisma.users.findFirst({
			where: {
				id: id
			},
			include: {
				templates: true,
				licenses: true
			}
		});
	}

	async findByEmail(email: string) {
		return this.prisma.users.findUnique({
			where: {
				email: email
			},
			include: {
				licenses: true,
				templates: true
			}
		});
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return this.prisma.users.update({
			where: {
				id: id
			},
			data: updateUserDto
		});
	}

	async attachLicense(userId: number, licenseId: number[]) {
		return await this.prisma.users.update({
			where: {
				id: userId
			},
			data: {
				licenses: {
					connect: licenseId.map((licenseId) => ({ id: licenseId }))
				}
			}
		});
	}
	async attachTemplate(userId: number, templateId: number[]) {
		return await this.prisma.users.update({
			where: {
				id: userId
			},
			data: {
				templates: {
					connect: templateId.map((templateId) => ({ id: templateId }))
				}
			}
		});
	}

	async detachLicense(userId: number, licenseId: number[]) {
		return await this.prisma.users.update({
			where: {
				id: userId
			},
			data: {
				licenses: {
					disconnect: licenseId.map((licenseId) => ({ id: licenseId }))
				}
			}
		});
	}
	async detachTemplate(userId: number, templateId: number[]) {
		return await this.prisma.users.update({
			where: {
				id: userId
			},
			data: {
				templates: {
					disconnect: templateId.map((templateId) => ({ id: templateId }))
				}
			}
		});
	}

	remove(id: number) {
		return this.prisma.users.delete({
			where: {
				id: id
			}
		});
	}
}
