import { Component, OnInit } from '@angular/core';
import { Recipe } from './Recipe.model';
import { RecipeServices } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
  //providers:[RecipeServices]
})
export class RecipeComponent implements OnInit {

  recipeDetails:Recipe;
  selectRecipe:Recipe;

  constructor(private recipeService:RecipeServices) { }

  ngOnInit() {
    this.recipeService.selectedRecipe.subscribe(
      (recipe:Recipe)=>{
        this.selectRecipe=recipe;
      }
    )
  }

  onSelectList(recipeList:Recipe){
    this.recipeDetails.name=recipeList.name;
    this.recipeDetails.discription=recipeList.discription;
    this.recipeDetails.imagePath=recipeList.imagePath;
  }

}
