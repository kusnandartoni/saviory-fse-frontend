import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  @ViewChild('input') input;

  public searchTextChanged = new Subject<string>();

  searchCategory = 'name';
  search: string = '';
  users: User[];
  faTrash = faTrashAlt;
  me: any = {};
  page = 1;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.sessionCheck();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getUsers();  
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(model=>{
      this.getFilteredUser();
    })
  }

  sessionCheck(){
    const token = this.authService.sessionCheck(this.router.url);
    if (token) {
      this.authService.me(token).subscribe(
        user=>{this.me = user}
      );
    }
  }

  searchUser(query:string){
    this.searchTextChanged.next(query);
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getFilteredUser(){
    if (this.searchCategory === "name"){
      this.userService.getUserByName(this.search).subscribe(users => {
        this.users = users;
      });
    }else if(this.searchCategory === "email"){
      this.userService.getUserByEmail(this.search).subscribe(users => {
        this.users = users;
      });
    }else if(this.searchCategory === "country"){
      this.userService.getUserByCity(this.search).subscribe(users => {
        this.users = users;
      });
    }
  }

  getInitial(name: string): string {
    return name.substr(0,1);
  }

  deleteUser(user: User) {
    if (confirm(`hapus user ${user.firstName} ${user.lastName} ?`)){
      this.userService.deleteUser(user).subscribe(user => {
        this.getUsers();
        alert("sukses");
      });
    }
  }

}
