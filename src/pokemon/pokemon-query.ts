import { IsOptional, IsString, IsNumberString, IsBooleanString, IsEnum } from 'class-validator';
import { PokemonQueryOrder } from './pokemon-query-order.enum';
import { PokemonQuerySort } from './pokemon-query-sort.enum';

export class PokemonQuery {
  @IsOptional()
  @IsNumberString()
  readonly offset: string;

  @IsOptional()
  @IsNumberString()
  readonly limit: string;

  @IsOptional()
  @IsEnum(PokemonQueryOrder)
  readonly order: PokemonQueryOrder;

  @IsOptional()
  @IsEnum(PokemonQuerySort)
  readonly sort: PokemonQuerySort;

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
