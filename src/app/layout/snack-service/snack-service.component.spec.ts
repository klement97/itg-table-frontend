import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SnackServiceComponent} from './snack-service.component';

describe('SnackServiceComponent', () => {
  let component: SnackServiceComponent;
  let fixture: ComponentFixture<SnackServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
