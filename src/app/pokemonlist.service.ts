import { Injectable } from '@angular/core';
import {Pokemon} from "./pokemonlist/pokemonlist.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonlistService {

  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor() { }

  async getPokemonList(): Promise<Pokemon[]> {
    try {
      const response = await fetch(`${this.apiUrl}?limit=10`);
      const data = await response.json();
      const pokemonList: Pokemon[] = data.results.map((pokemon: any) => {
        const pokemonId = this.extractIdFromUrl(pokemon.url)
        return {
          id: pokemonId,
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
        }
    });
      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      return [];
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
