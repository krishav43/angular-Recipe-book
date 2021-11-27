import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './Recipe.model';
import { DataStorageServices } from '../shared/data-storage.services';
import { Injectable } from '@angular/core';
import { RecipeServices } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolver implements Resolve<Recipe[]>{

    constructor(private dataStorageService:DataStorageServices, private recipeService:RecipeServices){}

    resolve(activeRouterSnapshot:ActivatedRouteSnapshot, routerSnapshot:RouterStateSnapshot){
        const recipe=this.recipeService.getRecipe();
        if(recipe.length===0){
            return this.dataStorageService.onFetchData()
        }
        else{
            return recipe;
        }
        ;
    }

}