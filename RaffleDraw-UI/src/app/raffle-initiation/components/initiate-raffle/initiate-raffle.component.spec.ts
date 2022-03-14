import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateRaffleComponent } from './initiate-raffle.component';

describe('InitiateRaffleComponent', () => {
  let component: InitiateRaffleComponent;
  let fixture: ComponentFixture<InitiateRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
