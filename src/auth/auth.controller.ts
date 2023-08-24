import {
  Body,
  Get,
  Post,
  Controller,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { Roles } from './guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { RolesGuard } from './guard/roles.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'Login using email and password.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'hello2@email.com' },
        password: { type: 'string', example: '123Hello' },
      },
      required: ['email', 'password'],
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @ApiOperation({
    description: 'Register a user.',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  // @ApiOperation({
  //   description: 'Social Login from next-auth front-end.',
  // })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       email: { type: 'string', example: 'User3@email.com' },
  //       userName: { type: 'string', example: 'johndoe123' },
  //       profilePicture: {
  //         type: 'string',
  //         example: 'https://example.com/profile.png',
  //       },
  //     },
  //     required: ['email', 'userName', 'profilePicture'],
  //   },
  // })
  // @Post('social')
  // async validateSocialLogin(
  //   @Body('email') email: string,
  //   @Body('userName') userName: string,
  //   @Body('profilePicture') profilePicture: string,
  // ) {
  //   return this.authService.validateSocialLogin(
  //     userName,
  //     email,
  //     profilePicture,
  //   );
  // }
  @ApiOperation({
    description: 'Create an administrator.',
  })
  // @Roles(UserRoles.SUPERADMIN)
	// @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin')
  async registerAdmin(@Body() admin: CreateUserDto) {
    return this.authService.registerAdmin(admin);
  }
}
