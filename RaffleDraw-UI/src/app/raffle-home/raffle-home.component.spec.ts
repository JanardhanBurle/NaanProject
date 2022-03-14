import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleHomeComponent } from './raffle-home.component';

describe('RaffleHomeComponent', () => {
  let component: RaffleHomeComponent;
  let fixture: ComponentFixture<RaffleHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
