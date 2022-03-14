import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRaffleComponent } from './create-raffle.component';

describe('CreateRaffleComponent', () => {
  let component: CreateRaffleComponent;
  let fixture: ComponentFixture<CreateRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
