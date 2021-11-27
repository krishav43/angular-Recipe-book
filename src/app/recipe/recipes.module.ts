import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeNewComponent } from "./recipe-new/recipe-new.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe.component";

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeNewComponent,
        RecipeEditComponent
    ],
    imports :[
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports :[
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeNewComponent,
        RecipeEditComponent
    ]
})
export class RecipesModule {}