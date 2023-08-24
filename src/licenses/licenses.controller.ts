import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Licenses')
@Controller('licenses')
export class LicensesController {
	constructor(private licensesService: LicensesService) {}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Create a license.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() createLicenseDto: CreateLicenseDto) {
		return this.licensesService.create(createLicenseDto);
	}

	@ApiOperation({
		description: 'Get all licenses.'
	})
	@Get()
	findAll() {
		return this.licensesService.findAll();
	}

	@ApiOperation({
		description: 'Get a license by its ID.'
	})
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.licensesService.findOne(+id);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Update a license by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	update(@Param('id') id: number, @Body() updateLicenseDto: UpdateLicenseDto) {
		return this.licensesService.update(+id, updateLicenseDto);
	}
	@ApiOperation({
		description: 'Add a UI Kit in license.'
	})
	@Patch('add/:id/:uiKitId')
	addUiKit(@Param('id') id: number, @Param('uiKitId') uiKitId: number) {
		return this.licensesService.addUiKit(+id, uiKitId);
	}
	@ApiOperation({
		description: 'Remove a UI Kit from license.'
	})
	@Patch('remove/:id/:uiKitId')
	removeUiKit(@Param('id') id: number, @Param('uiKitId') uiKitId: number) {
		return this.licensesService.removeUiKit(+id, uiKitId);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete a license by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.licensesService.remove(+id);
	}
}
