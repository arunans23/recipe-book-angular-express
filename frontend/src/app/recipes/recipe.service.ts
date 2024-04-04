import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg', [
      new Ingredient("French Fries", 2),
      new Ingredient("Pork Meat", 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])];

  constructor(private http: HttpClient) {}

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
    return this.http.put('https://recipebook-7dd32.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData(){
    console.log("test");
    return this.http.get('http://localhost:5001/recipes')
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
