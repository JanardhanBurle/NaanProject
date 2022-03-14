import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateRaffleFooterComponent } from './initiate-raffle-footer.component';

describe('InitiateRaffleFooterComponent', () => {
  let component: InitiateRaffleFooterComponent;
  let fixture: ComponentFixture<InitiateRaffleFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateRaffleFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateRaffleFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
