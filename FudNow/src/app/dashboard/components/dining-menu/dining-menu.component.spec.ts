import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningMenuComponent } from './dining-menu.component';

describe('DiningMenuComponent', () => {
  let component: DiningMenuComponent;
  let fixture: ComponentFixture<DiningMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiningMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
