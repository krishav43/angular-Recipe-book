import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeServices } from "./recipe/recipe.service";
import { DataStorageServices } from "./shared/data-storage.services";
import { ShoppingService } from "./shopping-list/shopping.service";

@NgModule({
    providers: [
        ShoppingService, 
        RecipeServices, 
        DataStorageServices, 
        { 
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true 
        }
    ]
})
export class CoreModule { }