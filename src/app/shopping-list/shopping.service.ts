import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';

export class ShoppingService{

    //changedIngredient=new EventEmitter<Ingredient[]>();
    changedIngredient = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>(); 

    ingredients:Ingredient[]=[
        new Ingredient('Apple',5),
        new Ingredient('orange',10)
      ];

    deletedIngredient:Ingredient;
    
    getIngredient(){
        return this.ingredients.slice();
    }

    getIngredients(index:number){
        return this.ingredients[index];
    }

    addNewIngredient(newIngredient:Ingredient){
        console.log("Shopping Service "+ newIngredient)
        this.ingredients.push(newIngredient);
        this.changedIngredient.next(this.ingredients.slice());
        console.log("After add ingredient "+ this.ingredients);
    }

    addIngredients(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.changedIngredient.next(this.ingredients.slice());
    }
    updateIngredient(index:number ,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.changedIngredient.next(this.ingredients.slice());
      }

    deleteIngredient(index:number){
        this.deletedIngredient=this.getIngredients(index);
        this.ingredients.splice(index,1);
        this.changedIngredient.next(this.ingredients.slice());
    }
}