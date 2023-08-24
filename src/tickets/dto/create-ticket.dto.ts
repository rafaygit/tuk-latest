import {
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketTypes } from '@prisma/client';
import { TicketStatuses } from '@prisma/client';

export class CreateTicketDto {
  @ApiProperty({ example: 'Subject' })
  @IsString()
  subject: string;

  @ApiProperty({ example: 'OPEN' })
  @IsString()
  status: TicketStatuses;

  @ApiProperty({ example: 'BUG' })
  @IsString()
  type: TicketTypes;

  @ApiProperty({ example: 'Description' })
  @IsOptional()
  @IsString()
  description: string;
}
