import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerScreenComponent } from './answer-screen.component';

describe('AnswerScreenComponent', () => {
  let component: AnswerScreenComponent;
  let fixture: ComponentFixture<AnswerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
