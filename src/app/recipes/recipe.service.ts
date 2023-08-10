import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>()
  recipeChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = []
  // = [
  //   new Recipe('A Test Recipe', 'A test',
  //     'https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.avif',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Chicken', 10)
  //     ]),
  //   new Recipe('A Test Recipe2', 'A test2',
  //     'https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.avif',
  //     [
  //       new Ingredient('Buns', 15),
  //     ])
  // ];
  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
}