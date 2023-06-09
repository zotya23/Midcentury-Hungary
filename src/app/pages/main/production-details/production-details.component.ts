



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainImage } from '../../../shared/models/MainImage';
import { MainImagesService } from '../../../shared/services/main-images.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-production-details',
  templateUrl: './production-details.component.html',
  styleUrls: ['./production-details.component.scss'],
})
export class ProductionDetailsComponent {
  image: MainImage | undefined;
  constructor(
    private route: ActivatedRoute,
    private mainImageService: MainImagesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadProductDetails(id);
      }
    });
  }
  

  loadProductDetails(id: string) {
    this.mainImageService.loadImageMeta().subscribe((images) => {
      const image = images.find((image) => image.id === id);
      if (image) {
        this.loadImage(image.image_url).subscribe((url) => {
          image.image_url = url;
          this.image = image;
        });
      }
    });
  }
  loadImage(imageUrl: string): Observable<string> {
    return this.mainImageService.loadImage(imageUrl); // use loadImage from MainImagesService to get download URL
  }
}
