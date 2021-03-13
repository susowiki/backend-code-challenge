import { IsOptional, IsInt, IsString, IsBoolean, IsNumberString, IsBooleanString } from 'class-validator';

export class ListPokemonDto {
  @IsOptional()
  @IsNumberString()
  readonly offset: string;

  @IsOptional()
  @IsNumberString()
  readonly limit: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsBooleanString()
  readonly favorite: string;
}
