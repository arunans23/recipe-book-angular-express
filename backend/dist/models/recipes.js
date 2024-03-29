"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
class Recipe {
    constructor(name, description, imagePath, ingredients) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
exports.Recipe = Recipe;
