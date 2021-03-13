import { IsInt, IsString, IsBoolean } from 'class-validator';

export class ListPokemonDto {
  @IsInt()
  readonly offset: number;

  @IsInt()
  readonly pageSize: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly type: string;

  @IsBoolean()
  readonly favorite: boolean;
}
