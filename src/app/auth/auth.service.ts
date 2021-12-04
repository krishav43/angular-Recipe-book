import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { DataStorageServices } from '../shared/data-storage.services';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{

    //user=new Subject<User>();
    user=new BehaviorSubject<User>(null);
    expireLoginTime:any;

    constructor(private http:HttpClient, private router:Router){}

    onSignUp(emailValue:string,passwordValue:string ){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
            email:emailValue,
            password:passwordValue,
            returnSecureToken:true
        }).pipe(catchError (this.handleError),tap(responseData=>{
            this.handleAuthenticateUser(responseData.email,responseData.idToken,+responseData.expiresIn,responseData.localId)
        }))
        
    }

    onLogin(emailValue:string,passwordValue:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email:emailValue,
            password:passwordValue,
            returnSecureToken:true
        }).pipe(catchError (this.handleError), tap(responseData=>{
            this.handleAuthenticateUser(responseData.email,responseData.idToken,+responseData.expiresIn,responseData.localId)
        }))
    }

    private handleAuthenticateUser(email:string,token:string,expiresIn:number,userId:string){
        const expireDate=new Date(new Date().getTime()+expiresIn*1000)
        const userAuth=new User(email,userId,token,expireDate);
        this.user.next(userAuth);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(userAuth));
    }

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage="Some error occur !!!";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage="The email address is already in use by another account.";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage="There is no user record corresponding to this identifier. The user may have been deleted."
                break;
            case 'INVALID_PASSWORD':
                errorMessage="The password is invalid or the user does not have a password."
                break;
        }

        return throwError(errorMessage);
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expireLoginTime){
            clearTimeout(this.expireLoginTime);
        }
        this.expireLoginTime=null;
    }

    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpireDate:string
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpireDate))

        if(loadedUser.token){
            this.user.next(loadedUser);
        }
        const remainingExpireTime=new Date(userData._tokenExpireDate).getTime()-new Date().getTime();
        this.autoLogout(remainingExpireTime)


    }

    autoLogout(expireTokenTime:number){
        //console.log(expireTokenTime);
        this.expireLoginTime=setTimeout(() => {
            this.logout()
        }, expireTokenTime);
    }

    
}