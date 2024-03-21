import { Component, OnInit } from '@angular/core';
import {Pokemon} from "./pokemonlist.model";
import {PokemonlistService} from "../pokemonlist.service";

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {
  pokemonList: Pokemon[] | undefined
  next: string | null | undefined
  previous:  string | null | undefined

  /*pokemonList: Array<Pokemon> = [{id: 1, name: "Charmander", imageUrl: ""}]*/

  constructor(private pokemonlistService: PokemonlistService) { }

  /**
   Funcion que sirve para la primera carga como el onRender de Marionette o el useEffect de React
   */
  ngOnInit(): void {
    /**
     Siendo la carga inicial enviamos null
     */
    this.getPokemonList(null)
  }

  getPokemonList(url: string | null| undefined): void {
      this.pokemonlistService.getPokemonList(url).then(pokemonList => {
      this.pokemonList = pokemonList.results
      this.next = pokemonList.nextUrl
      this.previous = pokemonList.previous
    })
  }


  /**Utilizamos nuestras funciones y dependiento de cada funcion reutilizamos nuestra funcion que nos devuelve a parte
   * de la lista de pokemones, la url del next y previous */
  onNext(): void {
    this.getPokemonList(this.next)
  }

  onPrevious() : void {
    this.getPokemonList(this.previous)
  }

}
