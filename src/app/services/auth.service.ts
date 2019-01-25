import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/auth';


  constructor(
    private http: HttpClient
  ) { }

  register (user: User): Observable<User> {
    const url = this.authUrl + '/register';
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user._id}`)),
      catchError(this.handleError<User>('register'))
    );
  }

  login (data:any): Observable<User> {
    const url = this.authUrl + '/login';
    return this.http.post<User>(url, data, httpOptions).pipe(
      tap((user: User) => this.log(`logged in w/ id=${user._id}`)),
      catchError(this.handleError<User>('login'))
    );
  }

  me(): Observable<User> {
    // need jwt token
    const url = this.authUrl + '/me';
    return this.http.get<User>(url, httpOptions).pipe(
      tap((user: User) => this.log(`check auth w/ id=${user._id}`)),
      catchError(this.handleError<User>('me'))
    );
  }

  logout() {

  }
  
  private log(message: string) {
    console.log(`UserService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
