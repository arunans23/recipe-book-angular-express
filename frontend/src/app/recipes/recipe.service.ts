import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  getRecipes(){
    return this.recipes;
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(environment.apiBaseUrl + '/recipes', body, {headers: headers});
  }

  fetchData(){
    return this.http.get(environment.apiBaseUrl + '/recipes')
    .pipe(
      map((response: any ) => response)
    )
    .subscribe(
      (data :Recipe[]) => {
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      }
    );
  }

}
