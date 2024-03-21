import {Pokemon} from "./pokemonlist.model";

export interface PokemonListApi {
  count: number
  nextUrl: string | null
  previous: string | null
  results: Array<Pokemon>
}
