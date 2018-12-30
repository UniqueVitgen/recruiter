import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropperAvatarComponent } from './image-cropper-avatar.component';

describe('ImageCropperAvatarComponent', () => {
  let component: ImageCropperAvatarComponent;
  let fixture: ComponentFixture<ImageCropperAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
