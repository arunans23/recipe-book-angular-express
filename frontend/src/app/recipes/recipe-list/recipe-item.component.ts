import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class RecipeItemComponent implements OnInit {
  @Input()recipe: Recipe;
  @Input()recipeId: number;

  ngOnInit(): void {
      console.log("RecipeItemComponent ngOnInit");
  }

}
