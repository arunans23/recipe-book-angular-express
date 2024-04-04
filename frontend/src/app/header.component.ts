import { Component} from '@angular/core';
import {RecipeService} from "./recipes/recipe.service";
import { RouterModule } from '@angular/router';
import { DropdownDirective } from './dropdown.directive'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [DropdownDirective, RouterModule],
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }

  onStore(){
    this.recipeService.storeData().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  onFetch(){
    console.log("fetching");
    this.recipeService.fetchData();
  }
}
