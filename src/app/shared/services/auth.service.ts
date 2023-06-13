import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, switchMap, of } from 'rxjs';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: Observable<User | null>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.currentUser = this.auth.authState.pipe(
      switchMap((firebaseUser) => {
        if (firebaseUser) {
          return this.firestore
            .doc<User>(`users/${firebaseUser.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      }),
      map((user) => {
        if (user) {
          return {
            id: user.id,
            email: user.email,
            username: user.username,
            name: {
              firstname: user.name.firstname,
              lastname: user.name.lastname,
            },
          };
        } else {
          return null;
        }
      })
    );
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser;
  }
}
