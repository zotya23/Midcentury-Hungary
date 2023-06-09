

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MainImage } from '../models/MainImage';

@Injectable({
  providedIn: 'root',
})
export class MainImagesService {
  collectionName = 'MainImages';
  mainImagesCollection: AngularFirestoreCollection<MainImage>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.mainImagesCollection = this.afs.collection<MainImage>(this.collectionName);
  }

  loadImageMeta(): Observable<MainImage[]> {
    return this.mainImagesCollection.valueChanges();
  }

  loadImage(imageUrl: string): Observable<string> {
    return this.storage.ref(imageUrl + '.jpg').getDownloadURL();
  }


}