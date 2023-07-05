import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../../shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: User;
  cartItems: any[] = [];

  constructor(
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.shoppingCartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });


  }

  addToCart(item: any): void {
    this.shoppingCartService.addToCart(item);
    this.snackBar.open('Item added to cart!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  removeFromCart(item: any): void {
    this.shoppingCartService.removeFromCart(item);
    this.snackBar.open('Item removed from cart!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  clearCart(): void {
    if (this.cartItems.length > 0) {
      this.shoppingCartService.clearCart();
      this.snackBar.open('You ordered the items!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      });
    } else {
      this.shoppingCartService.clearCart();
      this.snackBar.open('There is no item in the cart!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],

    });
  }
}
  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += Number(item.price);
    }
    return totalPrice;
  }
}
