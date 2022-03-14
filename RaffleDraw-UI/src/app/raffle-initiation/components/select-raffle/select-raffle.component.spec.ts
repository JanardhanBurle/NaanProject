import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRaffleComponent } from './select-raffle.component';

describe('SelectRaffleComponent', () => {
  let component: SelectRaffleComponent;
  let fixture: ComponentFixture<SelectRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
