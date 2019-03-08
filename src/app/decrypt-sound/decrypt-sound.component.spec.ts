import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptSoundComponent } from './decrypt-sound.component';

describe('DecryptSoundComponent', () => {
  let component: DecryptSoundComponent;
  let fixture: ComponentFixture<DecryptSoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecryptSoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
