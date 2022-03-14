import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-run-raffle',
  templateUrl: './run-raffle.component.html',
  styleUrls: ['./run-raffle.component.css']
})
export class RunRaffleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  beginRaffle() {
    this.router.navigate(['/raffle-initiation/begin-raffle']);
  }
}
