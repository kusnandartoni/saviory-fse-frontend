import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'https://zenith-wednesday.glitch.me/users/';

  constructor(
    private http: HttpClient
  ) { }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user._id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser (user: User): Observable<any> {
    return this.http.put(this.userUrl, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser (user: User): Observable<User> {
    const id = user._id;
    const url = `${this.userUrl}/${id}`;
 
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
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
