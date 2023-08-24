import { IsString, IsNumber, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserMetaDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'key' })
  @IsString()
  key: string;

  @ApiProperty({ example: 'value' })
  @IsOptional()
  @IsString()
  value?: string;
}
