import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);
		if (compareSync(password, user.password)) {
			const { password, ...result } = user;
			return result;
		} else {
			throw new HttpException('Invalid Credentials!', HttpStatus.UNAUTHORIZED);
		}
	}
	login(user: any) {
		const payload = { email: user.email, sub: user.id, role: user.role, licenses: user.licenses, templates: user.templates };
		return {
			access_token: this.jwtService.sign(payload)
		};
	}

	async register(user: CreateUserDto) {
		try {
			const newUser = await this.usersService.create(user);
			return this.login(newUser);
		} catch (error) {
			throw new HttpException('User already exists!', HttpStatus.CONFLICT);
		}
	}

	// async validateSocialLogin(
	//   userName: string,
	//   email: string,
	//   profilePicture: string,
	// ) {
	//   let user = await this.usersService.findByEmail(email);
	//   if (user && user.email === email) {
	//     const access_token = this.jwtService.sign(user);
	//     return access_token;
	//   } else {
	//     const userDto: CreateUserDto = {
	//       firstName: userName,
	//       lastName: userName,
	//       email: email,
	//       password: hashSync('social123', 8),
	//     };
	//     return this.register(userDto);
	//   }
	// }

	async registerAdmin(admin: CreateUserDto) {
		try {
			const adminLogin = await this.usersService.createAdmin(admin);
			return this.login(adminLogin);
		} catch (error) {
			throw new HttpException('User already exists!', HttpStatus.CONFLICT);
		}
	}
}
