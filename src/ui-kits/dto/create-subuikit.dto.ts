import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubuiKitDto {
  @ApiProperty({ example: 'sub-ui Kit' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'sub-ui kit Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, description: 'ID of the parent UI Kit' })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  parentId: number;
}