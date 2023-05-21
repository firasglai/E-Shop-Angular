import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from '../models/token';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private apiUrl = "http://localhost:8080";
    constructor(private http : HttpClient) { }

    register (username : string, password : string, email : string, name : string, address : string, 
        phone : string) : Observable<Token> {
        return this.http.post<Token>(`${this.apiUrl}/register`, {
            username,
            password,
            email,
            name,
            address,
            phone
        })
    }

    login (username : string, password : string) : Observable<Token> {
        return this.http.post<Token>(`${this.apiUrl}/login`, {
            username,
            password,
        })
    }

    createToken (username : string) : Observable<Token> {
        return this.http.post<Token>(`${this.apiUrl}/api/create-token`, {
            username
        });
    }

    getUsers () : Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/api/users`);
    }

    getUser (id : string) : Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/api/users/${id}`);
    }

    getUserByToken () : Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user`, {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            })
        });
    }

    updateUser (id : string, username : string, password : string, email : string, name : string, address : string, phone : string) : Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/api/users/${id}`, {
            username,
            password,
            email,
            name,
            address,
            phone 
        })
    }

    deleteUser (id : string) : Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/users/${id}`);
    }
}
