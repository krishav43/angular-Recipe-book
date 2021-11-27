import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DataStorageServices } from '../shared/data-storage.services';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private dataStorageService:DataStorageServices, private authService:AuthService) { }

  //@Output() onRecipeList= new EventEmitter<string>();
  //@Output() onShoppingList=new EventEmitter<string>();
 // @Output() featureSelected= new EventEmitter<string>(); using without route

  //@ViewChild('#navName') navTab:ElementRef;
  tabname:string;
  userSubcription:Subscription;
  isAuthenticateUser:boolean=false;



  ngOnInit() {
    this.userSubcription=this.authService.user.subscribe(userData=>{
      this.isAuthenticateUser=!userData?false:true;
    });
  }

  // onNavRecipe(){
  //   //console.log(this.navTab.nativeElement.value);
  //   this.tabname='Recipe';
  //   this.onRecipeList.emit(this.tabname)
  // }

  // onNavShopping(){
  //   this.tabname='Shopping';
  //   this.onShoppingList.emit(this.tabname)

  // }

  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);

  // } //using without router

  onSaveData(){
    this.dataStorageService.onStoreData();

  }
  onFetchData(){
    this.dataStorageService.onFetchData().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubcription.unsubscribe();
  }

}
