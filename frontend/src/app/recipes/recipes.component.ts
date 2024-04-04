import { Component, OnInit } from '@angular/core';
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  standalone: true,
  imports: [RouterOutlet, RecipeListComponent ]
})
export class RecipesComponent {

}
