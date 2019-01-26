import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { tap, catchError } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/auth';


  constructor(
    private http: HttpClient,
    private session: LocalStorageService,
    private router: Router
  ) { }

  register (user: User): Observable<User> {
    const url = this.authUrl + '/register';
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user._id}`)),
      catchError(this.handleError<User>('register'))
    );
  }

  login (data:any): Observable<any> {
    const url = this.authUrl + '/login';
    return this.http.post<any>(url, data, httpOptions).pipe(
      tap((data: any) => this.log(`logged in w/ id=${data.email}`)),
      catchError(this.handleError<User>('login'))
    );
  }

  me(token:string): Observable<User> {
    const option = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token })
    }
    const url = this.authUrl + '/me';
    return this.http.get<User>(url, option).pipe(
      tap((user: User) => this.log(`check auth w/ id=${user._id}`)),
      catchError(this.handleError<User>('me'))
    );
  }

  sessionCheck(url) {
    const auth = this.session.get('currentUser');
    if(auth){
      return auth.token
    }
    this.session.set('next', url);
    this.router.navigateByUrl('/login');
  }

  logout(){
    this.session.remove('currentUser');
    this.router.navigateByUrl('/login');
  }
  
  private log(message: string) {
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
