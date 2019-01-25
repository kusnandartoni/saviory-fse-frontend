import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any = {};
  next: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private session: SessionStorageService
  ) {
    this.next = this.session.get('nextPage');
  }

  ngOnInit() {
    console.log(this.router.url);
  }

  login() {
    console.log('login clicked');
    console.log(this.loginData);
    this.authService.login(this.loginData).subscribe(auth=>{
      if(auth.auth){
        this.session.set('currentUser',auth);
        this.router.navigateByUrl(this.next || '/list');
      }else{
        alert("invalid email/password");
      }
    })
  }

}
