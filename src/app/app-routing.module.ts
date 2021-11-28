import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo:'/recipe',pathMatch:'full'},
  //lazy loading
  {
    path:'recipe', 
    loadChildren: './recipe/recipes.module#RecipesModule'
  },
  {
    path:'shopping-list',
    loadChildren: './shopping-list/shoppings.module#ShoppingModule'
  },
  {
    path:'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    //Pre Loaded lazy loading
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
