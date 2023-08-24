import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComponentMetasService } from './component-metas.service';
import { CreateComponentMetaDto } from './dto/create-component-meta.dto';
import { UpdateComponentMetaDto } from './dto/update-component-meta.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
@ApiTags('Component-metas')
@Controller('component-metas')
export class ComponentMetasController {
  constructor(private readonly componentMetasService: ComponentMetasService) {}

  @ApiBearerAuth()
	@ApiOperation({
		description: 'Create component-meta'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createComponentMetaDto: CreateComponentMetaDto) {
    return this.componentMetasService.create(createComponentMetaDto);
  }

  @ApiOperation({
		description: 'Get all component-metas'
	})
  @Get()
  findAll() {
    return this.componentMetasService.findAll();
  }

  @ApiOperation({
		description: 'Get component-meta by Id'
	})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentMetasService.findOne(+id);
  }

  
  @ApiBearerAuth()
	@ApiOperation({
		description: 'Update component-meta by Id'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentMetaDto: UpdateComponentMetaDto) {
    return this.componentMetasService.update(+id, updateComponentMetaDto);
  }

  @ApiBearerAuth()
	@ApiOperation({
		description: 'Delete component-meta by Id'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentMetasService.remove(+id);
  }
}
