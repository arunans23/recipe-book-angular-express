import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { Recipe } from './models/recipes';
import { Ingredient } from './models/ingredient';

//Define the Port
const PORT = 5001;

//Initialize Express App
const app = express();
app.use(cookieParser());

var recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg', [
      new Ingredient("French Fries", 2),
      new Ingredient("Pork Meat", 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])];

app.get("/recipes", (req: Request, res: Response) => {
    res.send(recipes);
});

app.get("/recipes/:id", (req: Request, res: Response) => {
    const id =  parseInt(req.params.id);
    res.send(recipes[id]);
});

app.post("/recipes", (req: Request, res: Response) => {
    const recipe = req.body;
    recipes.push(recipe);
    res.send(recipes);
});

//Start the app and listen on the PORT
app.listen(PORT, () => { console.log(`Server Started at PORT ${ PORT }`); });