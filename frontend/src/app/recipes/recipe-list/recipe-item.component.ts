import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class RecipeItemComponent {
  @Input()recipe: Recipe;
  @Input()recipeId: number;

}
