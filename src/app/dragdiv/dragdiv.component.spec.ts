import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragdivComponent } from './dragdiv.component';

describe('DragdivComponent', () => {
  let component: DragdivComponent;
  let fixture: ComponentFixture<DragdivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragdivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
