import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { TweenLite, TimelineMax } from "gsap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.setItem('isLoggedin', 'true');
    interval(1000).pipe(
      map((x) => {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
      })
    );
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


  loginUser(value: string) {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/dashboard']);
    
  }

}
