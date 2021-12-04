import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/Placeholder/placeHolder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService, private router:Router, private componentFactoryResolver:ComponentFactoryResolver) { }

  isLogginMode=true;
  isLoading=false;
  errorMsg:string=null;
  @ViewChild ('f') loginForm:NgForm;
  @ViewChild (PlaceHolderDirective) holdAlert: PlaceHolderDirective;
  closedSub:Subscription;

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLogginMode=!this.isLogginMode;
  }

  onSubmit(authForm:NgForm){
    if(authForm.invalid){
      return;
    }
    const emailValue=authForm.value.email;
    const passwordValue=authForm.value.password;
    this.isLoading=true;
    let authObs:Observable<AuthResponseData>
    if(this.isLogginMode){
      authObs=this.authService.onLogin(emailValue,passwordValue);
    }
    else{
      authObs=this.authService.onSignUp(emailValue,passwordValue);
    }

    authObs.subscribe(response=>{
      //console.log(response);
      this.isLoading=false;
      this.router.navigate(['./recipe']);
    },
    errorMessage=>{
      //console.log(errorMessage);
      this.errorMsg=errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading=false;
    })
    //console.log(authForm);
  }

  onHandleError(){
    this.errorMsg=null;
  }

  private showErrorAlert(errorMessage:string){
    const alertComponent=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer=this.holdAlert.viewContainer;
    hostViewContainer.clear();
    const alertInstance=hostViewContainer.createComponent(alertComponent);
    alertInstance.instance.message=errorMessage;
    this.closedSub=alertInstance.instance.closed.subscribe(()=>{

      hostViewContainer.clear();
      this.closedSub.unsubscribe();
    })


  }
  ngOnDestroy(){
    if(this.closedSub){
      this.closedSub.unsubscribe();
    }
  }

}
