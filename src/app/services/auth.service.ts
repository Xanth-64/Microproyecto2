import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebAuth: AngularFireAuth) {} 
  //Login Base para distintos providers (Que necesiten POPUP)
    private baseLogin (authProvider: firebase.default.auth.AuthProvider): Promise<firebase.default.auth.UserCredential> {
      return this.firebAuth.signInWithPopup(authProvider);
    }
  // Google Auth

    public googleLogin():Promise<void>{ 
        return this.baseLogin(new firebase.default.auth.GoogleAuthProvider()).then((response) =>{
          if (response) {
            localStorage.setItem("currentUser",JSON.stringify(response));
          }
        }).catch((ERR) =>{
            console.log(ERR);
        })
    }

      // Authentication Validation
      public isAuthenticated(): boolean{
        return localStorage.getItem('currentUser') != null;
      }

    // Actual getter for the Current User

      public getCurrentUser(): Observable<firebase.default.User>{
        return this.firebAuth.authState;
      }



    // Logout methods
    public loginOut(): Promise<void>{
      return this.firebAuth.signOut().then((response) => {
        localStorage.removeItem('currentUser');

      }).catch((ERR) => {
        console.log(ERR);
      })
  }
}

