import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRafflesComponent } from './user-raffles.component';

describe('UserRafflesComponent', () => {
  let component: UserRafflesComponent;
  let fixture: ComponentFixture<UserRafflesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRafflesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRafflesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
