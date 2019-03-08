import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptSoundComponent } from './encrypt-sound.component';

describe('EncryptSoundComponent', () => {
  let component: EncryptSoundComponent;
  let fixture: ComponentFixture<EncryptSoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptSoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
