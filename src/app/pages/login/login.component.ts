import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Subscription, subscribeOn } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email = new FormControl();
  password: any = new FormControl('');

  loadingSubscription?: Subscription;
  loading: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  constructor(
    private router: Router,
    private loadingService: FakeLoadingService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async login() {
    this.loading = true;
    //promise

    const email = this.email.value || '';
    const password = this.password.value || '';

    this.authService
      .login(this.email.value, this.password.value)
      .then((cred) => {
        console.log(cred);
        this.loading = true;
        this.snackBar.open('You logged in successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });

        /**/

        //this.router.navigateByUrl('/main');
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
        this.snackBar.open('Your email or password is incorrect!', 'Try Again!', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
