import { IsString, IsNumber, IsOptional } from 'class-validator';


export class CreateComponentMetaDto {
    @IsString()
	key: string;

	@IsOptional()
	@IsString()
	value?:string;

	@IsNumber()
	componentId: number;
}
