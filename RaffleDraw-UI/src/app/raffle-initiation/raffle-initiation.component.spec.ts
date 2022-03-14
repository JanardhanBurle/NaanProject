import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleInitiationComponent } from './raffle-initiation.component';

describe('RaffleInitiationComponent', () => {
  let component: RaffleInitiationComponent;
  let fixture: ComponentFixture<RaffleInitiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleInitiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
