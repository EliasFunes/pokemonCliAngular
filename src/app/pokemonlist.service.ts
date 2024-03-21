import { Injectable } from '@angular/core';
import {Pokemon} from "./pokemonlist/pokemonlist.model";
import {PokemonListApi} from "./pokemonlist/pokemonlistApi.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonlistService {

  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor() { }

  async getPokemonList(url: string | null| undefined): Promise<PokemonListApi> {

    let urlToFetch: string
    if(typeof url == "string") {
      urlToFetch = url
    } else {
      urlToFetch = `${this.apiUrl}?limit=10`
    }

    try {
      const response = await fetch(urlToFetch);
      const data = await response.json();
      const pokemonList: Pokemon[] = data.results.map((pokemon: any) => {
        const pokemonId = this.extractIdFromUrl(pokemon.url)
        return {
          id: pokemonId,
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
        }
    });

      // TODO: falta validaciones de los datos tanto para la buena como mala respuesta.
      return {
        count: data.count,
        nextUrl: data.next,
        previous: data.previous,
        results: pokemonList
      }

    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      return {
        count: 0,
        nextUrl: null,
        previous: null,
        results: []
      }
    }
  }

  private extractIdFromUrl(url: string): number {
    //usamos expresiones regulares para determinarl el ID del pokemon: pattern matching obtenido directamente de una IA: chat GPT XD
    const idMatch = url.match(/\/(\d+)\/?$/);
    //utilizamos operador ternario para evaluar si tenemos un match para extraer y transformar nuestro id a un tipo numerico, si no, se devuelve un valor negativo
    //TODO: falta propagar un error si no se puede obtener el ID
    return idMatch ? parseInt(idMatch[1], 10) : -1;
  }


}
