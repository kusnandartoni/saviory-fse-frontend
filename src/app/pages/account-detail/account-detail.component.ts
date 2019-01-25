import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  faTrash = faTrashAlt;
  user: any = {};
  id = this.route.snapshot.params['id'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    console.log(this.id);
  }
  
  ngAfterViewInit() {
    this.userService.getUserById(this.id).subscribe(user=> {
      console.log(user);
      this.user = user;
    })
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
