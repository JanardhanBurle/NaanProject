import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiate-raffle',
  templateUrl: './initiate-raffle.component.html',
  styleUrls: ['./initiate-raffle.component.css']
})
export class InitiateRaffleComponent implements OnInit {
  slides: any[];
  constructor(private router: Router) { }

  ngOnInit() {
    this.slides = [
      {
        itemId: 1,
        type: 'VIDEO',
        contentUrl: 'https://www.w3schools.com/tags/movie.mp4',
        priority: 1,
        alt: 'Al Jawhare Draw'
      },
      {
        itemId: 2,
        type: 'IMG',
        contentUrl: '../../../../assets/images/aljawahara2.jpg',
        priority: 2,
        alt: 'Al Jawhare Draw'
      },
      {
        itemId: 3,
        type: 'IMG',
        contentUrl: '../../../../assets/images/aljawahara2.jpg',
        priority: 3,
        alt: 'Al Jawhare Draw'
      },
      {
        itemId: 4,
        type: 'IMG',
        contentUrl: '../../../../assets/images/aljawahara2.jpg',
        priority: 4,
        alt: 'Al Jawhare Draw'
      }
    ];
  }


  selectRaffle() {
    this.router.navigate(['/raffle-initiation/select-raffle']);
  }

}
