import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class AttachTemplateToUserDto {
  @ApiProperty({ example: 1, type:'number' })
  @IsNumber()
  userId: number;
 
  @ApiProperty({ example: [1,2], type:'[number]' })
  template:number[]
}
