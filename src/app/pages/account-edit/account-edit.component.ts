import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    this.getUser();
  }

  getUser(){
    this.userService.getUserById(this.id).subscribe(user => {
      console.log(user);
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
