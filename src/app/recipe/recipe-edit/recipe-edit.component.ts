import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeServices } from '../recipe.service';
import { Recipe } from '../Recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  recipeNewId:number;
  editMode=false;
  recipeForm:FormGroup;
  recipe:Recipe=null;
  constructor(private route:ActivatedRoute, private recipeService:RecipeServices, private roter:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    )
  }

  initForm(){
    let recipeName='';
    let recipeUrl='';
    let discription='';
    let recipeIngredient= new FormArray([]);
    if(this.editMode){
      const recipe=this.recipeService.getRecipeById(this.id);
      recipeName=recipe.name;
      recipeUrl=recipe.imagePath;
      discription=recipe.discription;
      if(recipe['ingredient']){
        for(let ingre of recipe.ingredient){
          recipeIngredient.push(
            new FormGroup({
              'name':new FormControl(ingre.name,Validators.required),
              'amount':new FormControl(ingre.amount,[Validators.required,Validators.pattern(/[0-9]+/)])
            })
          )
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeUrl,Validators.required),
      'discription':new FormControl(discription,Validators.required),
      'ingredient': recipeIngredient
    })
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }

  onSubmit(){
  //  console.log(this.recipeForm);
    
    if(!this.editMode){
      // console.log(this.recipeForm.get('name').value);
      // this.recipeNewId=this.recipeService.getRecipeId();
      // this.recipeNewId=this.recipeNewId+1;
      
      // const name=this.recipeForm.get('name').value;
      // const imagePath=this.recipeForm.get('image').value;
      // const discription=this.recipeForm.get('description').value;
      // const ingredient=null;
      // const recipes=new Recipe(this.recipeNewId,name,discription,imagePath,ingredient);
      //this.recipeService.addRecipe(recipes);
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    else{
      // const name=this.recipeForm.get('name').value;
      // const imagePath=this.recipeForm.get('image').value;
      // const discription=this.recipeForm.get('description').value;
      // const ingredient=null;
      // const recipes=new Recipe(this.id,name,discription,imagePath,ingredient);
      //this.recipeService.updateRecipe(recipes,this.id);
      this.recipeService.updateRecipe(this.recipeForm.value,this.id);

    }
    this.roter.navigate(['../'],{relativeTo:this.route})

  }

  onAddNewIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/[0-9]+/)])
      })
    )
  }

  onClear(){
    this.recipeForm.reset();
    //this.roter.navigate(['recipe']);
    this.roter.navigate(['../'],{relativeTo:this.route})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

}
