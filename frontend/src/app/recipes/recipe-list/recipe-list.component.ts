import {Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {RecipeItemComponent} from "../recipe-list/recipe-item.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  standalone: true,
  imports: [RecipeItemComponent, RouterModule, CommonModule]
})
export class RecipeListComponent implements OnInit {
  recipes : Recipe[] = [];
  
  users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Doe', age: 35 }
  ];

  constructor(private recipeService: RecipeService ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

}
