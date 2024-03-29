"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const recipes_1 = require("./models/recipes");
const ingredient_1 = require("./models/ingredient");
//Define the Port
const PORT = 5001;
//Initialize Express App
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
var recipes = [
    new recipes_1.Recipe('Schnitzel', 'Very tasty', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg', [
        new ingredient_1.Ingredient("French Fries", 2),
        new ingredient_1.Ingredient("Pork Meat", 1)
    ]),
    new recipes_1.Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
];
app.get("/recipes", (req, res) => {
    res.send(recipes);
});
app.get("/recipes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.send(recipes[id]);
});
app.post("/recipes", (req, res) => {
    const recipe = req.body;
    recipes.push(recipe);
    res.send(recipes);
});
//Start the app and listen on the PORT
app.listen(PORT, () => { console.log(`Server Started at PORT ${PORT}`); });
