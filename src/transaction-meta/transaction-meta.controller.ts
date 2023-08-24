import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionMetaService } from './transaction-meta.service';
import { CreateTransactionMetaDto } from './dto/create-transaction-meta.dto';
import { UpdateTransactionMetaDto } from './dto/update-transaction-meta.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRoles } from '@prisma/client';
@ApiTags('Transaction-meta')
@Controller('transaction-meta')
export class TransactionMetaController {
  constructor(private readonly transactionMetaService: TransactionMetaService) {}

  @ApiOperation({
		description: 'Create Transaction-meta'
	})
  @ApiBearerAuth()
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTransactionMetaDto: CreateTransactionMetaDto) {
    return this.transactionMetaService.create(createTransactionMetaDto);
  }

  @ApiOperation({
		description: 'Get all Transaction-meta'
	})
  @Get()
  findAll() {
    return this.transactionMetaService.findAll();
  }

  
  @ApiOperation({
		description: 'Get Transaction-meta by Id'
	})
  @ApiBearerAuth()
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionMetaService.findOne(+id);
  }

  
  @ApiOperation({
		description: 'Update Transaction-meta'
	})
  @ApiBearerAuth()
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionMetaDto: UpdateTransactionMetaDto) {
    return this.transactionMetaService.update(+id, updateTransactionMetaDto);
  }

  @ApiOperation({
		description: 'Delete Transaction-meta by Id'
	})
  @ApiBearerAuth()
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionMetaService.remove(+id);
  }
}
