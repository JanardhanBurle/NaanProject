import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserToRaffleComponent } from './remove-user-to-raffle.component';

describe('RemoveUserToRaffleComponent', () => {
  let component: RemoveUserToRaffleComponent;
  let fixture: ComponentFixture<RemoveUserToRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveUserToRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUserToRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
