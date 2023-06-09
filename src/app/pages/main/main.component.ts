import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainImagesService } from 'src/app/shared/services/main-images.service';
import { MainImage } from '../../shared/models/MainImage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('flip', [
      state(
        'front',
        style({
          transform: 'rotateY(0deg)',
        })
      ),
      state(
        'back',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('front <=> back', animate('300ms ease-out')),
    ]),
  ],
})
export class MainComponent implements OnInit {
  images: MainImage[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mainImageService: MainImagesService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.loadImageMeta();
  }

  loadImageMeta() {
    this.mainImageService.loadImageMeta().subscribe((images) => {
      this.images = images;
      this.images.forEach((image) => {
        this.loadImage(image.image_url).subscribe((url) => {
          image.image_url = url;
        });
      });
    });
  }

  loadImage(imageUrl: string): Observable<string> {
    return this.mainImageService.loadImage(imageUrl); // use loadImage from MainImagesService to get download URL
  }

  navigateToProductDetail(image: MainImage) {
    this.router.navigate(['/product', image.id]);
  }
}
