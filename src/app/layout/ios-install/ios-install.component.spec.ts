import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IosInstallComponent } from '@src/app/layout/ios-install/ios-install.component';

describe('IosInstallComponent', () => {
  let component: IosInstallComponent;
  let fixture: ComponentFixture<IosInstallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IosInstallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IosInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
