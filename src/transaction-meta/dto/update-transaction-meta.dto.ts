import { PartialType } from '@nestjs/swagger';
import { CreateTransactionMetaDto } from './create-transaction-meta.dto';

export class UpdateTransactionMetaDto extends PartialType(CreateTransactionMetaDto) {}
