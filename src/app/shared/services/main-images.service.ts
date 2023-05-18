import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MainImage } from '../models/MainImage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class MainImagesService {
  collectionName = 'MainImages';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  loadImageMeta(): Observable<MainImage[]> {
    return this.afs.collection<MainImage>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl + '.jpg').getDownloadURL();
  }
}