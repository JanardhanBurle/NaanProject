import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbCoreComponent } from './cb-core.component';

describe('CbCoreComponent', () => {
  let component: CbCoreComponent;
  let fixture: ComponentFixture<CbCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
