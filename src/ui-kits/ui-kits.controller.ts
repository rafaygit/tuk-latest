import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, ParseBoolPipe, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UiKitsService } from './ui-kits.service';
import { CreateUiKitDto } from './dto/create-ui-kit.dto';
import { UpdateUiKitDto } from './dto/update-ui-kit.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRoles } from '@prisma/client';
import {CreateSubuiKitDto} from './dto/create-subuikit.dto'
@ApiTags('UI Kits')
@Controller('ui-kits')
export class UiKitsController {
  constructor(private readonly uiKitsService: UiKitsService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create a UI Kit.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUiKitDto: CreateUiKitDto) {
    return this.uiKitsService.create(createUiKitDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create a sub-UI Kit.',
  })
  @Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('subuikits')
	addSubuiKit(@Body() createSubuiKitDto: CreateSubuiKitDto){
		return this.uiKitsService.addSubUiKit(createSubuiKitDto);
	}

  @ApiOperation({
    description: 'Get all UI Kits.',
  })
  @Get()
  findAll(
    @Query('content', new DefaultValuePipe(false), ParseBoolPipe) content: boolean,
  ) {
    return this.uiKitsService.findAll(content);
  }

  @ApiOperation({
    description: 'Get all UI Kits paginated.',
  })
  @Get("/skip/:skip/take/:take")
	findPaginated(@Param('skip') skip: number, @Param('take') take: number) {
		return this.uiKitsService.findPaginated(skip,take)
	}

	@ApiOperation({
		description: 'Get all Sub-UiKits Paginated'
	})
	@Get('subuikits/skip/:skip/take/:take')
	findAllSubcategoriesPaginated(@Param('skip') skip: number, @Param('take') take: number) {
		return this.uiKitsService.findAllSubKitsPaginated(skip, take);
	}

	@ApiOperation({
		description: 'Get all Sub-Uikits'
	})
	@Get('subuikits')
	findAllSubcategories() {
		return this.uiKitsService.findAllSubUikits();
	}

  @ApiOperation({
    description: 'Get a UI Kit by its ID.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uiKitsService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update a UI Kit by its ID.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUiKitDto: UpdateUiKitDto) {
    return this.uiKitsService.update(+id, updateUiKitDto);
  }
  
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Delete a UI Kit by its ID.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.uiKitsService.remove(+id);
  }
}
