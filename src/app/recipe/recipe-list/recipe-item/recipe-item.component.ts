import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../Recipe.model';
import { RecipeServices } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:Recipe
  //@Output() recipeSelected=new EventEmitter<void>();

  constructor(private recipeService:RecipeServices) { }

  ngOnInit() {
  }

  // onSelect(){
  //   //this.recipeSelected.emit();
  //   this.recipeService.selectedRecipe.emit(this.recipe);
    
  // }

}
