import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'angular-web-storage';
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
    private session: LocalStorageService
  ) {
    this.next = this.session.get('nextPage');
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginData).subscribe(auth=>{
      if(auth){
        if(auth.auth){
          this.session.set('currentUser',auth);
          this.router.navigateByUrl(this.next || '/list');
        }else{
          alert(auth.message);
        }
      }
    },error=>{console.log(error)});
  }

}
