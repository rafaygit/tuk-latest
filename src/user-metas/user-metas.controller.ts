import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserMetasService } from './user-metas.service';
import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { UpdateUserMetaDto } from './dto/update-user-meta.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('User-metas')
@Controller('user-metas')
export class UserMetasController {
  constructor(private readonly userMetasService: UserMetasService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create a User-metas.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserMetaDto: CreateUserMetaDto) {
    return this.userMetasService.create(createUserMetaDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get all User-metas.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userMetasService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get User-meta by Id',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMetasService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update User-meta by Id',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMetaDto: UpdateUserMetaDto) {
    return this.userMetasService.update(+id, updateUserMetaDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Delete a User-metas by Id',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMetasService.remove(+id);
  }
}
