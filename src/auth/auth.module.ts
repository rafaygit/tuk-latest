import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtConstants } from './strategy/constant';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '5h' }
		})
	],
	providers: [AuthService, LocalStrategy],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
