import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showAlert = false;
  constructor(
    private authHelper: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  authWithGoogle(){
    this.authHelper.googleLogin().then(() =>{
      if(this.authHelper.isAuthenticated()){
        this.router.navigate(['charListView']);
      }
      else{
        this.showAlert = true;
      }
    }).catch((ERR) => {
      this.showAlert = true;
      console.log(ERR);
    })
  }
}
