import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleDisplayComponent } from './raffle-display.component';

describe('RaffleDisplayComponent', () => {
  let component: RaffleDisplayComponent;
  let fixture: ComponentFixture<RaffleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
