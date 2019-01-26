import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  faTrash = faTrashAlt;
  user: any = {};
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
  
  ngAfterViewInit() {
    this.userService.getUserById(this.id).subscribe(user=> {
      this.user = user;
    });
    console.log(this.me)
    console.log(this.user)
  }

  sessionCheck(){
    const token = this.authService.sessionCheck(this.router.url);
    if (token) {
      this.authService.me(token).subscribe(
        user=>{
          console.log("from api",user);
          this.me = user
        }
      );
    }
  }
  deleteUser(){
    if (confirm(`hapus user ${this.user.firstName} ${this.user.lastName}?`)){
      this.userService.deleteUser(this.user).subscribe(user=>{
        alert("sukses");
        this.router.navigateByUrl('/list');
      })
    }
  }



}
