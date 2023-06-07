import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: Observable<User | undefined> | undefined;


  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = this.firestore
          .collection<User>('users')
          .doc(user.uid)
          .valueChanges();
      } else {
        this.currentUser = undefined;
      }
    });
  }
}