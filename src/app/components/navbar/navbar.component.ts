import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: firebase.default.User = null;
  isAuthenticated: boolean = false;
  userID: string = ''

  constructor(private authHelp: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    //console.log(this.isAuthenticated);
  }

  getUser():void{
    this.authHelp.getCurrentUser().subscribe((response) =>{
      if(response){
        this.user = response;
        this.isAuthenticated = true;
        this.userID = response.uid;
        return;
      }
    })
    this.isAuthenticated = false;
  }
  logout():void {
    this.authHelp.loginOut().then(() =>{
      this.router.navigate(['login']);
      this.isAuthenticated = false;
      this.user = null;
    }).catch((ERR) =>{
      console.log(ERR)
    })
  }
}
