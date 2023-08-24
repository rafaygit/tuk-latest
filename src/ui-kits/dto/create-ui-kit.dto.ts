import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUiKitDto {

  @ApiProperty({ example: 'UI Kit 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;
  

}
