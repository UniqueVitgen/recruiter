import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NameCandidateModalComponent} from '../name-candidate-modal/name-candidate-modal.component';
import {Candidate} from '../../../../classes/candidate';
import {AttachmentForm} from '../../../../classes/html/attachment-form';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {Attachment} from '../../../../classes/attachment';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {EnumWorker} from '../../../../workers/enum/enum.worker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttachmentDialogData} from '../../../../interfaces/dialog/init/attachment-dialog-data';
import {FileWorker} from '../../../../workers/file/file.worker';


@Component({
  selector: 'app-image-cropper-avatar',
  templateUrl: './image-cropper-avatar.component.html',
  styleUrls: ['./image-cropper-avatar.component.scss']
})
export class ImageCropperAvatarComponent implements OnInit {
  public editedCandidate: Candidate;
  public editedAttachment: AttachmentForm;
  public attachmentResult: BaseDialogResult<Attachment>;
  public attachmentForm: FormGroup;
  sourseFile: File;
  @ViewChild('fileUpload') fileUpload: ElementRef;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<NameCandidateModalComponent>,
    public fileWorker: FileWorker,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AttachmentDialogData ) {
    // console.log('candidate', this.candidate);
    this.editedCandidate = Object.assign({}, this.data.sourceCandidate);
    if (this.data.isEdit) {
      // this.editedAttachment = Object.assign(new Attachment(), this.data.sourceAttachment);
    } else {
      this.editedAttachment = new AttachmentForm();
    }
    this.attachmentForm = this.fb.group({
      attachmentType: ['', Validators.compose([Validators.required])],
      filePath: ['', Validators.compose([Validators.required])]
    });
  }
  ngOnInit() {
    this.editedAttachment.attachmentType = 'PHOTO';
    console.log(this.fileUpload);
  }
  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.sourseFile = event.target.files[0];
    console.log(this.sourseFile);
  }
  imageCropped(event) {
    this.croppedImage = event.base64;
    this.editedAttachment.file = this.fileWorker.dataURLtoFile(this.croppedImage, this.sourseFile.name);
    console.log('1', event, this.editedAttachment.file);
  }
  imageLoaded() {
    this.showCropper = true;
    console.log('image loaded');
  }
  cropperReady() {
    console.log('cropper ready');
  }
  loadImageFailed () {
    console.log('Load failed');
  }
  clickButton() {
    this.fileUpload.nativeElement.click();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  editCandidate() {
    console.log(this.editedAttachment);
    if (this.editedCandidate.attachments == null) {
      this.editedCandidate.attachments = [];
    }
    this.candidateService.uploadAttachment(this.editedCandidate, this.editedAttachment).subscribe(resCandidate => {
      this.attachmentResult = {
        isEdit: false,
        resObject: resCandidate,
        success: true
      };
      this.dialogRef.close(this.attachmentResult);
    });
  }
}
