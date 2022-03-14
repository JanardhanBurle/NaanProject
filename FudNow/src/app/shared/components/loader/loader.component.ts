import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TweenLite, TimelineMax } from "gsap";
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }
  isPageLoaded: boolean = false;
  ngOnInit() {

    var imgWrapper = $("#logo-wraper"),
      images = $(".rotating-img"),
      tl = new TimelineMax({ repeat: -1 });

    TweenLite.set(imgWrapper, { perspective: 500 });
    TweenLite.set(images, { rotationY: 180 });
    TweenLite.set(images[0], { rotationY: 0 });

    for (var i = 0; i < images.length; i++) {
      var nextImage = (i + 1) == images.length ? images[0] : images[i + 1];
      tl
        .to(images[i], 2, { rotationY: '-180_ccw' }, (2 * i))
        .to(nextImage, 2, { rotationY: '0_ccw' }, (2 * i));
    }
  }

  public myInterval: number = 3000;
  public activeSlideIndex: number = 0;
  public noWrapSlides: boolean = false;

  activeSlideChange(event: any) {
    console.log(event);
  }

  public slides: Array<Object> = [
    { "image": "https://mdbootstrap.com/img/Photos/Slides/img%20(18).jpg" },
    { "image": "https://mdbootstrap.com/img/Photos/Slides/img%20(19).jpg" },
    { "image": "https://mdbootstrap.com/img/Photos/Slides/img%20(20).jpg" },
  ];
}
