import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToRaffleComponent } from './add-user-to-raffle.component';

describe('AddUserToRaffleComponent', () => {
  let component: AddUserToRaffleComponent;
  let fixture: ComponentFixture<AddUserToRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
