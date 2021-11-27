import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router:Router, private authService:AuthService){};
  title = 'Project';
  shoppingTab:boolean=false;
  recipeTab:boolean=false;
  loadedFeature = 'Recipe';

  ngOnInit(){
    this.authService.autoLogin();
  }

  // onRecipeTab(tabname:string){
  //   if(tabname=='Recipe'){
  //     this.recipeTab=true;
  //     this.shoppingTab=false;
  //     //this.router.navigate(['/recipe']);
  //   }

  // }

  // onShoppingTab(tabname:string){
  //   if(tabname=='Shopping'){
  //     this.shoppingTab=true;
  //     this.recipeTab=false;
  //     //this.router.navigate(['/shopping-list']);
  //   }
  // }

  // onNavigate(tabname:string){
  //   if(tabname=="Recipe"){
  //     this.shoppingTab=false;
  //     this.recipeTab=true;
  //   }
  //   else{
  //     this.shoppingTab=true;
  //     this.recipeTab=false;

  //   }

  // }

  // onNavigate(feature:string){
  //   this.loadedFeature=feature;
  //   // console.log(this.loadedFeature=='Recipe');
  //   // if(this.loadedFeature=='Recipe'){
  //   //   console.log(this.loadedFeature)
  //   //   this.router.navigate(['/recipe'])
  //   // }
  //   // else if(this.loadedFeature!='Recipe'){
  //   //   this.router.navigate(['/shopping-list'])
  //   // }
    

  // }// using for Output feature

}
