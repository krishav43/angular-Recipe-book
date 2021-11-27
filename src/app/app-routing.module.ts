import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeNewComponent } from './recipe/recipe-new/recipe-new.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './recipe/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/authguard.service';

const routes: Routes = [
  {path:'', redirectTo:'/recipe',pathMatch:'full'},
  {path:'recipe',component:RecipeComponent,canActivate:[AuthGuardService],
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent},
    {path:':id',component:RecipeDetailsComponent, resolve:[RecipeResolver]},
    {path:':id/edit',component:RecipeEditComponent, resolve:[RecipeResolver]}
  ]},
  {path:'shopping-list',component:ShoppingListComponent}, 
  {path:'auth', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
