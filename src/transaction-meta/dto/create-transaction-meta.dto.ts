import { Type } from 'class-transformer';
import { IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTransactionMetaDto {
    @ApiProperty({ example: "sample meta key" })
	key: string;

	@ApiProperty({ example: "sample meta value" })
	value: string;

	@ApiProperty({ example: 1 })
	@Type(() => Number)
	@IsNumber()
	transactionId: number;
}
