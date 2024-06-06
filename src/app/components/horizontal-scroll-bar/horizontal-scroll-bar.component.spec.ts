import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollBarComponent } from './horizontal-scroll-bar.component';

describe('HorizontalScrollBarComponent', () => {
  let component: HorizontalScrollBarComponent;
  let fixture: ComponentFixture<HorizontalScrollBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalScrollBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalScrollBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
