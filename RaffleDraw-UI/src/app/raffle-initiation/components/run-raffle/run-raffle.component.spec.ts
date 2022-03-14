import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunRaffleComponent } from './run-raffle.component';

describe('RunRaffleComponent', () => {
  let component: RunRaffleComponent;
  let fixture: ComponentFixture<RunRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
