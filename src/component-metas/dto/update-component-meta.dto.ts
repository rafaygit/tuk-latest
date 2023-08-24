import { PartialType } from '@nestjs/swagger';
import { CreateComponentMetaDto } from './create-component-meta.dto';

export class UpdateComponentMetaDto extends PartialType(CreateComponentMetaDto) {}
