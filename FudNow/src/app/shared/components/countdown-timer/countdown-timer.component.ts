import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, AfterViewInit {

  constructor() { }
  public timerEvent;
  ngOnInit() {
    const mealTime = new Date();
    mealTime.setHours(28, 0, 10, 0);
    console.log(mealTime);
    const currentDate = new Date();
    const a = mealTime.getTime() - currentDate.getTime();
    if (mealTime.getTime() > currentDate.getTime()) {
      console.log('mealTime--------->', mealTime.toTimeString());
      localStorage.setItem('mealTime', mealTime.toTimeString());
      this.timerEvent = setInterval(this.startTimer, 1000);
      this.startTimer();
    }

  }


  private startTimer(): any {
    const date = localStorage.getItem('mealTime');
    console.log('abc--------->', date, 'currenttime', new Date());
    const time = date.split(' ')[0];
    console.log(Number(time.split(':')[0]));
    const _this = new CountdownTimerComponent();
    let h = _this.checkhrs(Number(time.split(':')[0]));
    let m = _this.checkMinute(Number(time.split(':')[1]));
    const s = _this.checkSecond((Number(time.split(':')[2]) - 1));
    if (Number(m) === 0 && Number(s) === 0) { h = h - 1; }
    if (Number(s) === 0) { m = m - 1; }
    // if(m<0){alert('timer completed')}
    _this.setsec(s.toString());
    _this.setmin(m.toString());
    _this.sethr(h.toString());
    const timer = new Date();
    timer.setHours(h, m, s, 0);
    localStorage.setItem('mealTime', timer.toTimeString());
    const currentDate = new Date();
    if (timer.getTime() <= currentDate.getTime()) {
      clearInterval(_this.timerEvent);
      return;
    }

  }



  private checkSecond(sec): any {
    if (sec < 10 && sec >= 0) { sec = '0' + sec; } // add zero in front of numbers < 10
    if (sec < 0) { sec = '59'; }
    return sec;
  }

  private checkMinute(min): any {
    if (min < 10 && min >= 0) { min = '0' + min; } // add zero in front of numbers < 10
    if (min < 0) { min = '59'; }
    return min;
  }

  private checkhrs(hrs): any {
    if (hrs < 10 && hrs >= 0) { hrs = '0' + hrs; } // add zero in front of numbers < 10
    if (hrs < 0) { hrs = '24'; }
    return hrs;
  }


  ngAfterViewInit() {
  }


  private sethr(hr): any {
    const digit = hr.split('');
    this.setdigit('.hr1', Number(digit[0]));
    this.setdigit('.hr2', Number(digit[1]));
  }

  private setmin(min): any {
    const digit = min.split('');
    this.setdigit('.min1', Number(digit[0]));
    this.setdigit('.min2', Number(digit[1]));
  }

  private setsec(sec): any {
    const digit = sec.split('');
    this.setdigit('.sec1', Number(digit[0]));
    this.setdigit('.sec2', Number(digit[1]));
  }

  private setdigit(target, val): any {
    switch (val) {
      case 0:
        $(target).attr('id', 'zero');
        break;
      case 1:
        $(target).attr('id', 'one');
        break;
      case 2:
        $(target).attr('id', 'two');
        break;
      case 3:
        $(target).attr('id', 'three');
        break;
      case 4:
        $(target).attr('id', 'four');
        break;
      case 5:
        $(target).attr('id', 'five');
        break;
      case 6:
        $(target).attr('id', 'six');
        break;
      case 7:
        $(target).attr('id', 'seven');
        break;
      case 8:
        $(target).attr('id', 'eight');
        break;
      case 9:
        $(target).attr('id', 'nine');
        break;
    }
  }


}