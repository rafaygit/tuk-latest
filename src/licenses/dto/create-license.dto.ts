import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateLicenseDto {
  @ApiProperty({example: "Premium License"})
  @Type(() => String)
  name: string;
  
  @ApiProperty({example: "description"})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({example: 200})
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: [1,2] })
  uiKits?:number[]
 
 
}
