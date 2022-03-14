import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMenuStartComponent } from './pre-menu-start.component';

describe('PreMenuStartComponent', () => {
  let component: PreMenuStartComponent;
  let fixture: ComponentFixture<PreMenuStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreMenuStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMenuStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
