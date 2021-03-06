import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  //providers:[ShoppingService]
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[]=[];

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
    this.ingredients=this.shoppingService.getIngredient();
    this.shoppingService.changedIngredient.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients
      }
    )
  }

  addNewIngredient(newIngredient:Ingredient){
   // console.log("shopping-list"+newIngredient.name)
    this.ingredients.push(newIngredient);
  }

  

  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index);
  }

}
