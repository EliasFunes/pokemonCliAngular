import { Component, OnInit } from '@angular/core';
import {Pokemon} from "./pokemonlist.model";
import {PokemonlistService} from "../pokemonlist.service";

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {
  pokemonList: Pokemon[] | undefined;

  /*pokemonList: Array<Pokemon> = [{id: 1, name: "Charmander", imageUrl: ""}]*/

  constructor(private pokemonlistService: PokemonlistService) { }

  ngOnInit(): void {
    this.getPokemonList()
  }

  getPokemonList(): void {
    this.pokemonlistService.getPokemonList().then(pokemonList => {
      this.pokemonList = pokemonList
    })
  }

}
