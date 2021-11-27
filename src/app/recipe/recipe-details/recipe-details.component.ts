import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../Recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeServices } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  //@Input() recipe:Recipe;
  recipe:Recipe;

  constructor(private recipeService:RecipeServices, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.recipe=this.recipeService.getRecipeById(+params['id'])
      }
    )
  }

  addIngredient(ingredients:Ingredient[]){
    for(var i=0;i<ingredients.length;i++){
      alert(ingredients[i].name);
      this.recipeService.addIngredient(ingredients[i])
    }
    
    //this.recipeService.addIngredient
  }

  deleteRecipe(recipeId:number){
    this.recipeService.deleteRecipe(recipeId);
    this.router.navigate(['recipe']);
  }

}
