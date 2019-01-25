import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
  agree = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitNewUser(){
    this.authService.register(this.user).subscribe( user=> {
      alert(`user ${this.user.firstName} ${this.user.lastName} berhasil ditambahkan`);
      this.router.navigateByUrl('/list');
    })
  }

}
