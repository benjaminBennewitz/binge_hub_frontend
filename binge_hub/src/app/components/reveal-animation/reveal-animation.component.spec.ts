import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealAnimationComponent } from './reveal-animation.component';

describe('RevealAnimationComponent', () => {
  let component: RevealAnimationComponent;
  let fixture: ComponentFixture<RevealAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevealAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevealAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
