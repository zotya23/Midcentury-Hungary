import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss'],
})
export class SuccessfulComponent implements OnInit {
  userId: string = '';

  constructor(private actRoute: ActivatedRoute, private locatioin: Location) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((param: any) => {
      this.userId = param.userId as string;
    });
  }

  goBack() {
    this.locatioin.back();
  }
 
}
