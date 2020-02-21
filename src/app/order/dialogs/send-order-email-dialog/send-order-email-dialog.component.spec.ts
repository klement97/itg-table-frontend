import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SendOrderEmailDialogComponent} from '@src/app/order/dialogs/send-order-email-dialog/send-order-email-dialog.component';

describe('SendOrderEmailDialogComponent', () => {
  let component: SendOrderEmailDialogComponent;
  let fixture: ComponentFixture<SendOrderEmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendOrderEmailDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOrderEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
