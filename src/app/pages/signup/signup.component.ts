import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
    name: new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
    }),
  });

  constructor(
    private locatioin: Location,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  onSubmit() {
    if (this.signUpForm.valid) {
      const password = this.signUpForm.get('password')?.value;
      const rePassword = this.signUpForm.get('rePassword')?.value;

      if (password !== rePassword) {
        // Jelezd az egyezés hiányát
        this.signUpForm.get('rePassword')?.setErrors({ mismatch: true });
        return;
      }
      console.log(this.signUpForm.value);

      this.authService

        .signup(
          this.signUpForm.get('email')?.value,
          this.signUpForm.get('password')?.value
        )
        .then((cred) => {
          const user: User = {
            id: cred.user?.uid as string,
            email: this.signUpForm.get('email')?.value,
            username: this.signUpForm.get('email')?.value.split('@')[0],
            name: {
              firstname: this.signUpForm.get('name.firstname')?.value,
              lastname: this.signUpForm.get('name.lastname')?.value,
            },
          };

          this.userService
            .create(user)
            .then((_) => {
              console.log('User added successfully!');

              this.snackBar.open('You registered successfully', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['success-snackbar'],
              });

              // Sikeres regisztráció üzenet megjelenítése
            })
            .catch((error) => {
              console.error(error);
              this.snackBar.open(
                'Registration was unseccessfull! Please check are there any errors below!',
                'Try Again!',
                {
                  duration: 4000,
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
                }
              );
              // Hibakezelés a felhasználó létrehozása során
            });
        })
        .catch((error) => {
          console.error(error);
          if (error.code === 'auth/email-already-in-use') {
            this.snackBar.open(
              'This email address is already registered.',
              'Try Again!',
              {
                duration: 4000,
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              }
            );
          } else {
            this.snackBar.open(
              'Registration was unseccessfull! Please check are there any errors!',
              'Try Again!',
              {
                duration: 4000,
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              }
            );
          }
        });
    } else {
      // Az űrlap érvénytelen, hibaüzenetek megjelenítése
      this.signUpForm.markAllAsTouched();
      this.snackBar.open(
        'Registration was unseccessfull! Please check are there any errors!',
        'Try Again!',
        {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        }
      );
    }
  }
  goBack() {
    this.locatioin.back();
  }
}
