import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginRaffleComponent } from './begin-raffle.component';

describe('BeginRaffleComponent', () => {
  let component: BeginRaffleComponent;
  let fixture: ComponentFixture<BeginRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
