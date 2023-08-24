import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create a transaction.'
  })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Body() licenseIds: number[], templatesIds: number[]) {
    return this.transactionsService.create(createTransactionDto, licenseIds, templatesIds);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get all transactions.',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }
  @ApiOperation({
    description: 'Get a transaction by its ID.',
  })
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }
  @ApiOperation({
    description: 'Update a transaction by its ID.',
  })
 
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }
  @ApiOperation({
    description: 'Delete a transaction by its ID.',
  })
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
