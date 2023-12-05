import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'a dummy decription',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/09/23/0/FNK_Skillet-Chicken-Thighs_H1_s4x3.jpg.rend.hgtvcom.616.462.suffix/1632420651769.jpeg',
      [new Ingredient('Tomatto', 6), new Ingredient('Apples', 10)]
    ),
    new Recipe(
      'A test recipe',
      'a dummy decription',
      'https://cdn.broadsheet.com.au/cache/10/30/1030bc60f9023eddcaf9e4686ada3ff5.jpg',
      [new Ingredient('Tomatto', 6)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
