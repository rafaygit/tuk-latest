import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({ example: 4 })
  @IsNumber()
  ticketId: number;

  @ApiProperty({ example: 'Hello!' })
  @IsString()
  message: string;
}
