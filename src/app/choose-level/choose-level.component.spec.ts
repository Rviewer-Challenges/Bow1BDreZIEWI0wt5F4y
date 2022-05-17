import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLevelComponent } from './choose-level.component';

describe('ChooseLevelComponent', () => {
  let component: ChooseLevelComponent;
  let fixture: ComponentFixture<ChooseLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
