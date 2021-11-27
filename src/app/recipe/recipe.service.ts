import {Recipe} from './Recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeServices{
    constructor(private shoppingService:ShoppingService){}

    selectedRecipe= new EventEmitter<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[]=[
    //     new Recipe(1,'Shakshuka', 'This is a veg recipe','https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',[new Ingredient('Tomato',10),new Ingredient('Onion',2)]),
    //     new Recipe(2,'Paneer Butter Masala','Veg dish','https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2-500x500.jpg',[new Ingredient('Paneer',15),new Ingredient('jalfire',5)])
    //   ];

    private recipes:Recipe[]=[];

    getRecipe(){
        console.log(this.recipes);
        return this.recipes.slice();

    }

    setRecipe(recipe:Recipe[]){
        this.recipes=recipe;
        this.recipesChanged.next(this.recipes.slice());
        //console.log(this.recipes);
    }

    addIngredient(ingredient:Ingredient){
        console.log("Recipe Service "+ ingredient)
        this.shoppingService.addNewIngredient(ingredient);

    }

    getRecipeById(id:number):Recipe{
        for(var i=0;i<this.recipes.length;i++){
            if(this.recipes[i].id==id){
                return this.recipes[i];
            }
        }
        return null;

    }

    addRecipe(recipe:Recipe){
        var id=this.getRecipeId();
        recipe.id=id+1;
        this.recipes.push(recipe);
        console.log(this.recipes);
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipeId():number{
        var id=0;
        for(var i=0;i<this.recipes.length;i++){
            var recipeId=this.recipes[i].id;
            if(id<recipeId){
                id=recipeId;
            }
        }
        return id;
    }

    updateRecipe(recipe:Recipe,id:number){
        for(var i=0;i<this.recipes.length;i++){
            if(this.recipes[i].id==id){
                alert(id+" "+recipe.id+" "+this.recipes[i].id)
                recipe.id=id;
                this.recipes[i]=recipe;
            }
        }
        console.log(this.recipes);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(recipeId:number){
        console.log(recipeId-1);
        var index;
        for(var i=0;i<this.recipes.length;i++){
            if(this.recipes[i].id==recipeId){
                index=i;
                break;
            }
        }
        this.recipes.splice(index,1);
        console.log(this.recipes);
        this.recipesChanged.next(this.recipes.slice());
    }

}