import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
    isAdmin: false,
  }
  id = this.route.snapshot.params['id'];
  me: any = {};

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadUrl: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private storage: AngularFireStorage
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

  startUpload(event: FileList){
    const file = event.item(0);
    if(file.type.split('/')[0]!=='image'){
      alert('unsupported file type');
      return;
    }
    const path = `saviory/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    this.task.snapshotChanges().pipe(
      finalize(()=>{
        this.downloadUrl = ref.getDownloadURL();
        ref.getDownloadURL().subscribe(url=>{
          console.log(url);
        })
      })
    ).subscribe()
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  
}
