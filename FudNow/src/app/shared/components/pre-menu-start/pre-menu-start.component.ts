import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TweenLite, TimelineMax } from "gsap";

@Component({
  selector: 'app-pre-menu-start',
  templateUrl: './pre-menu-start.component.html',
  styleUrls: ['./pre-menu-start.component.scss']
})
export class PreMenuStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadLogoAnimation();
  }



  private loadLogoAnimation() {

    var imgWrapper = $("#logo-wraper"),
      images = $(".rotating-img"),
      tl = new TimelineMax({ repeat: -1 });

    TweenLite.set(imgWrapper, { perspective: 0 });
    TweenLite.set(images, { rotationY: 180 });
    TweenLite.set(images[0], { rotationY: 0 });

    for (var i = 0; i < images.length; i++) {
      var nextImage = (i + 1) == images.length ? images[0] : images[i + 1];
      tl
        .to(images[i], 2, { rotationY: '-180_ccw' }, (2 * i))
        .to(nextImage, 2, { rotationY: '0_ccw' }, (2 * i));
    }
  }

}
