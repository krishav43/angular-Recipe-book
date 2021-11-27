import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient} from '../../shared/ingredient.model'
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingService:ShoppingService) { }
  //@ViewChild('nameInput') ingredientName:ElementRef;
  //@ViewChild('amountInput') amount:ElementRef;
  @ViewChild('f') addIngredientForm:NgForm;
  //@Output() addOnIngredient=new EventEmitter<Ingredient>();
  addSingleIngredient:Ingredient;
  subscription:Subscription;
  editMode=false;
  editIngredientIndex:number;
  editedItem:Ingredient;



  ngOnInit() {
    this.subscription=this.shoppingService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editIngredientIndex=index;
        this.editedItem=this.shoppingService.getIngredients(index);
        this.addIngredientForm.setValue({
          nameInput:this.editedItem.name,
          amountInput:this.editedItem.amount

        })
      }
    );
  }

  addIngredient(){
    console.log(this.addIngredientForm);
    //console.log("shopping-edit"+this.ingredientName.nativeElement.value)
    //this.addSingleIngredient.name=this.ingredientName;
    // this.addOnIngredient.emit({
    //   name:this.ingredientName.nativeElement.value,
    //   amount:this.amount.nativeElement.value
    // })
    const ingName= this.addIngredientForm.value.nameInput;
    const ingAmount= this.addIngredientForm.value.amountInput;
    const newIngredient = new Ingredient(ingName, ingAmount);
    //this.addOnIngredient.emit(newIngredient);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editIngredientIndex,newIngredient)
    }
    else{
      this.shoppingService.addNewIngredient(newIngredient);
    }
    this.editMode=false;
    this.addIngredientForm.reset();

  }

  onClearForm(){
    this.addIngredientForm.reset();

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editIngredientIndex);
    this.addIngredientForm.reset();
    this.editMode=false;
  }

}
