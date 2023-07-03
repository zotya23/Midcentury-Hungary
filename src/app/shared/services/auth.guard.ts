


import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private snackBar: MatSnackBar) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
      return true;
    }
    this.snackBar.open('Please signup or log in first!', 'OK!', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['warning-snackbar'],
    });
    return false;

    
  }
}
