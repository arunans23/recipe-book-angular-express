import {Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeRoutes} from "./recipes/recipes.routing";


export const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: RecipeRoutes},
  {path: 'shopping-list', component: ShoppingListComponent}
];
