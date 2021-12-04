import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import {Recipe} from '../Recipe.model'
import { RecipeServices } from '../recipe.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

 // @Output() recipeWasSelected=new EventEmitter<Recipe>();

  // recipes: Recipe[]=[
  //   new Recipe('Shakshuka', 'This is a veg recipe','https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'),
  //   new Recipe('Paneer Butter Masala','Veg dish','https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2-500x500.jpg')
  // ];

  recipes:Recipe[]=[]
  subscription: Subscription;


  constructor(private recipeService:RecipeServices, private route:Router, private router:ActivatedRoute) {
    //console.log("Constructor")
    this.recipes=this.recipeService.getRecipe();
   }

  ngOnInit() {
    //console.log("ngOnInit")
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    //this.recipes = this.recipeService.getRecipes();
    this.recipes=this.recipeService.getRecipe();

  }

  onSelectItem(recipeItem:Recipe){
    //this.selectedListRecipe.emit(recipeItem);

  }

  onNewRecipe(){
    this.route.navigate(['new'],{relativeTo:this.router});
  }
  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe)
  // }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
