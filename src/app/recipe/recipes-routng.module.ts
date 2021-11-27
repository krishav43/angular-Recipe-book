import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/authguard.service";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe.component";

const routes: Routes = [
    {
        path: 'recipe', component: RecipeComponent, canActivate: [AuthGuardService],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailsComponent, resolve: [RecipeResolver] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver] }
        ]
    },
]
@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class RecipesRoutingModule { }