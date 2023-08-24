import { PartialType } from '@nestjs/swagger';
import { CreateUserMetaDto } from './create-user-meta.dto';

export class UpdateUserMetaDto extends PartialType(CreateUserMetaDto) {}
