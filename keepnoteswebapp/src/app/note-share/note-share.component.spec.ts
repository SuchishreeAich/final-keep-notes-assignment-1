import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteShareComponent } from './note-share.component';

describe('NoteShareComponent', () => {
  let component: NoteShareComponent;
  let fixture: ComponentFixture<NoteShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
