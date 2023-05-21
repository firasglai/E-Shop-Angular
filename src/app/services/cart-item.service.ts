import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { CartItem } from '../models/cart-item';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  private apiUrl = "http://localhost:8080";
    constructor(private http : HttpClient) { }
    getCartItem (userId : string, productId : string) : Observable<CartItem> {
        return this.http.get<CartItem>(`${this.apiUrl}/api/cart-items/${userId}/${productId}`)
    }

    addToUserCart (userId : string, productId : string) : Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/api/users/${userId}/cart/add/${productId}`, {
        })
    }

    getUserCart (userId : string) : Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${this.apiUrl}/api/users/${userId}/cart`)
    }

    updateUserCartItem (userId : string, productId : string, quantity : Number) : Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/api/users/${userId}/cart/update/${productId}`, {
            quantity
        })
    }

    deleteUserCartItem (userId : string, productId : string) : Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/users/${userId}/cart/remove/${productId}`)
    }
}
