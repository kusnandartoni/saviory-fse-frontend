import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  user: User = {
    _id: '',
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phone: null,
    country: null,
    birthday: null,
    isAdmin: false
  }
  id = this.route.snapshot.params['id'];
  me: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.sessionCheck();
   }

  ngOnInit() {

  }
  ngAfterViewInit(){
    this.getUser();
  }
  
  sessionCheck(){
    const token = this.authService.sessionCheck(this.router.url);
    if (token) {
      this.authService.me(token).subscribe(
        user=>{this.me = user}
      );
    }
  }

  getUser(){
    this.userService.getUserById(this.id).subscribe(user => {
      this.user = user;
    });
  }

  save() {
    this.userService.updateUser(this.user).subscribe(user=>{
      alert(user.firstName+ 'berhasil diupdate');
      this.router.navigateByUrl('/list');
    })
  }

  cancel(){
    this.router.navigateByUrl('/list');
  }
}
