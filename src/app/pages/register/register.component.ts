import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitNewUser(){
    this.userService.addUser(this.user).subscribe( user=> {
      console.log(user);
      alert(`user ${user.firstName} ${user.lastName} berhasil ditambahkan`);
      this.router.navigateByUrl('/list');
    })
  }

}
