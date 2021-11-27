import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { RecipeServices } from '../recipe/recipe.service';
import { Recipe } from '../recipe/Recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageServices{

    constructor(private http:HttpClient, private recipeService:RecipeServices, private authService: AuthService){}

    onStoreData(){
        const recipe=this.recipeService.getRecipe();
        console.log('Recipe ',recipe)
        //this.http.put('https://recipe-book-6ca69.firebaseio.com/recipe.json',recipe).subscribe(
        this.http.put('https://recipe-book-c4525-default-rtdb.firebaseio.com//recipe.json',recipe).subscribe(
            response=>{
                console.log(response);
            }
        )
    }

    onFetchData(){

        //return this.http.get<Recipe[]>('https://recipe-book-6ca69.firebaseio.com/recipe.json')
        return this.http.get<Recipe[]>('https://recipe-book-c4525-default-rtdb.firebaseio.com/recipe.json')
        .pipe(map(recipe=>{
            return recipe.map(recipe=>{
                return {...recipe,ingredient:recipe.ingredient?recipe.ingredient:[]};
            })
        }),
        tap(recipe=>{
            this.recipeService.setRecipe(recipe);
        })
        )
    }
}