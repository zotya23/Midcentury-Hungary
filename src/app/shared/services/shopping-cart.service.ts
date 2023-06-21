import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItems: any[] = [];
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  constructor() {
    this.loadCartItems();
  }

  getCartItems(): BehaviorSubject<any[]> {
    return this.cartItemsSubject;
  }

  addToCart(item: any): void {
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItems();
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);
      this.saveCartItems();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.removeCartItems();
  }

  private loadCartItems(): void {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  private saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeCartItems (): void {
    localStorage.removeItem('cartItems');
  }
  
}
