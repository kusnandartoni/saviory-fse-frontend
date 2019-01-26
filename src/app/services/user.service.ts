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

  private userUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUserByName(name: string): Observable<User[]> {
    const url = `${this.userUrl}?name=${name}`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUserByEmail(email: string): Observable<User[]> {
    const url = `${this.userUrl}?email=${email}`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUserByCity(city: string): Observable<User[]> {
    const url = `${this.userUrl}?country=${city}`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<any>('getUserById'))
    );
  }

  updateUser (user: User): Observable<any> {
    const id = user._id;
    const url = `${this.userUrl}/${id}`;
    
    return this.http.put(url, user, httpOptions).pipe(
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
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
