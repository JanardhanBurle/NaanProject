import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleManagementComponent } from './raffle-management.component';

describe('RaffleManagementComponent', () => {
  let component: RaffleManagementComponent;
  let fixture: ComponentFixture<RaffleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
