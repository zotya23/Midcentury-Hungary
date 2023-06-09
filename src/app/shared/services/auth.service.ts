import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, switchMap } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  
  getCurrentUser(): Observable<User | null> {
    return this.auth.authState.pipe(
      map(user => {
        if (user) {
          return {
            id: user.uid,
            email: user.email ?? '',
            username: '',
            name: {
              firstname: '',
              lastname: ''
            }
          };
        } else {
          return null;
        }
      })
    );
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }
  
}
