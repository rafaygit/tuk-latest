import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AttachLicenseToUserDto } from './dto/attach-license-to-user.dto';
import { AttachTemplateToUserDto } from './dto/attach-template-to-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create a user.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get all users.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findClient() {
    return this.usersService.findUserRole();
  }

  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  findAdmin() {
    return this.usersService.findAdminRole();
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get a user by its ID.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('connectLicense')
  addLicense(
    @Body() attachLicenseToUserDto: AttachLicenseToUserDto
  ) {
    return this.usersService.attachLicense(attachLicenseToUserDto.userId, attachLicenseToUserDto.licenses);
  }

  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('deattachLicense')
  removeLicense(
    @Body() attachLicenseToUserDto: AttachLicenseToUserDto
  ) {
    return this.usersService.detachLicense(attachLicenseToUserDto.userId, attachLicenseToUserDto.licenses);
  }

  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('connectTemplate')
  addTemplate(
    @Body() attachTemplateToUserDto: AttachTemplateToUserDto
  ) {
    return this.usersService.attachTemplate(attachTemplateToUserDto.userId, attachTemplateToUserDto.template);
  }

  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('deattachTemplate')
  removeTemplate(
    @Body() attachTemplateToUserDto: AttachTemplateToUserDto
  ) {
    return this.usersService.detachTemplate(attachTemplateToUserDto.userId, attachTemplateToUserDto.template);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    description: 'Update a user by its ID.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @ApiOperation({
    description: 'Delete a user by its ID.',
  })
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
