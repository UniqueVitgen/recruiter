import {Component, OnInit, Inject, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { NameCandidateModalComponent } from '../name-candidate-modal/name-candidate-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Attachment } from 'src/app/classes/attachment';
import { AttachmentDialogData } from 'src/app/interfaces/dialog/init/attachment-dialog-data';
import { AttachmentType } from 'src/app/enums/attachment-type.enum';
import { EnumWorker } from 'src/app/workers/enum/enum.worker';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttachmentForm} from '../../../../classes/html/attachment-form';
import {FileWorker} from '../../../../workers/file/file.worker';

@Component({
  selector: 'app-attachment-candidate-modal',
  templateUrl: './attachment-candidate-modal.component.html',
  styleUrls: ['./attachment-candidate-modal.component.scss']
})
export class AttachmentCandidateModalComponent implements OnInit {

  public editedCandidate: Candidate;
  public editedAttachment: AttachmentForm;
  public attachmentResult: BaseDialogResult<Attachment>;
  public attachmentForm: FormGroup;
  @Output('clickSave') outputClickSave: EventEmitter<AttachmentForm> = new EventEmitter();

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<NameCandidateModalComponent>,
    public enumWorker: EnumWorker,
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
  }

  selectFileToUpload(event) {
    console.log(event.target.files[0]);
    this.editedAttachment.file = <File>event.target.files[0];
    this.imageChangedEvent = event;
  }

  getAttachmentsTypes() {
    const valuesOfEnum = this.enumWorker.getValuesFromEnum(AttachmentType);
    // console.log(valuesOfEnum);
    return valuesOfEnum;
  }

  editCandidate() {
    console.log(this.editedAttachment);
    this.outputClickSave.emit(this.editedAttachment);
    // if (this.editedCandidate.attachments == null) {
    //   this.editedCandidate.attachments = [];
    // }
    // this.candidateService.uploadAttachment(this.editedCandidate, this.editedAttachment).subscribe(resCandidate => {
    //   this.attachmentResult = {
    //     isEdit: false,
    //     resObject: resCandidate,
    //     success: true
    //   };
    //   this.dialogRef.close(this.attachmentResult);
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  imageCropped(event) {
    this.croppedImage = event.base64;
    this.editedAttachment.file = this.fileWorker.dataURLtoFile(this.croppedImage, this.editedAttachment.file.name);
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

}
