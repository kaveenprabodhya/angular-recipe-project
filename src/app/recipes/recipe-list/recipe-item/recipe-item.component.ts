import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipeEl: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected() {
    this.recipeSelected.emit();
  }
}
