


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainImage } from '../../../shared/models/MainImage';
import { MainImagesService } from '../../../shared/services/main-images.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-production-details',
  templateUrl: './production-details.component.html',
  styleUrls: ['./production-details.component.scss'],
})
export class ProductionDetailsComponent {
  image: MainImage | undefined;
  constructor(
    private route: ActivatedRoute,
    private mainImageService: MainImagesService,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar,
    private locatioin: Location
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
  addToCart(item: MainImage): void {
    if (item.available === 'Yes') {
      this.shoppingCartService.addToCart(item);
      this.snackBar.open('Item added to the cart!', 'OK!', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      });
    } else {
      this.snackBar.open('Item is not available!', 'OK!', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }
  }

    
  goBack() {
    this.locatioin.back();
  }
}
