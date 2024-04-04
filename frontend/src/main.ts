import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ShoppingListService } from './app/shopping-list/shopping-list.service';
import { RecipeService } from './app/recipes/recipe.service';
import { provideRouter} from '@angular/router';

if (environment.production) {
  enableProdMode();
}



bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes), importProvidersFrom(BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule),
        RecipeService, ShoppingListService
    ]
});
