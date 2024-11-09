import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertthresholdsConfigComponent } from './alertthresholds-config.component';

describe('AlertthresholdsConfigComponent', () => {
  let component: AlertthresholdsConfigComponent;
  let fixture: ComponentFixture<AlertthresholdsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertthresholdsConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertthresholdsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
