import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrl: './recipe-start.component.css',
})
export class RecipeStartComponent {
  recipesFound = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    if (this.recipeService.getRecipes().length < 1) {
      this.recipesFound = false;
    }
  }
}
