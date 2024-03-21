import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonlistComponent } from "./pokemonlist/pokemonlist.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {path: 'pokemonlist', component: PokemonlistComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
