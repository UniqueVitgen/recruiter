import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Candidate} from '../../../classes/candidate';
import {Feedback} from '../../../classes/feedback';
import {BaseDialogResult} from '../../../interfaces/dialog/result/base-dialog-result';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NameCandidateModalComponent} from '../candidate/name-candidate-modal/name-candidate-modal.component';
import {FeedbackService} from '../../../services/feedback/feedback.service';
import {EnumWorker} from '../../../workers/enum/enum.worker';
import {NoteDialogData} from '../../../interfaces/dialog/init/note-dialog-data';
import {CandidateExperience} from '../../../classes/candidate-experience';
import {DevFeedbackDialogData} from '../../../interfaces/dialog/init/dev-feedback-dialog-data';
import {DevFeedback} from '../../../classes/dev-feedback';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';

@Component({
  selector: 'app-dev-feedback-modal',
  templateUrl: './dev-feedback-modal.component.html',
  styleUrls: ['./dev-feedback-modal.component.scss']
})
export class DevFeedbackModalComponent implements OnInit {

  public editedCandidate: Candidate;
  public editedFeedback: DevFeedback;
  public experienceResult: BaseDialogResult<DevFeedback>;
  public testFeedbackStates = ['OPEN', 'CLOSED'];
  public formNote: FormGroup;
  @Output('clickSave') outputClickSave: EventEmitter<DevFeedback> = new EventEmitter();

  constructor(
    private candidateService: CandidateService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DevFeedbackModalComponent>,
    public feedbackService: FeedbackService,
    private typeCheckingWorker: TypeCheckingWorker,
    public enumWorker: EnumWorker,
    @Inject(MAT_DIALOG_DATA) public data: DevFeedbackDialogData ) {
    // console.log('candidate', this.candidate);
    if (this.data.isEdit) {
      this.editedFeedback =this.typeCheckingWorker.parseObject(this.data.sourceDevFeedback);
    } else {
      this.editedFeedback = new DevFeedback();
    }
    this.editedFeedback.candidateId = this.data.sourceCandidate.id;
    this.formNote = this.fb.group({
      // state: ['', Validators.compose([Validators.required])],
      text: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  editCandidate() {
    this.outputClickSave.emit(this.editedFeedback);
    // this.feedbackService.add(this.editedFeedback).subscribe(res => {
    //     this.experienceResult = {
    //       isEdit: false,
    //       resObject: res,
    //       success: true
    //     };
    //     this.dialogRef.close(this.experienceResult);
    // });
    // if (this.editedCandidate.experiences == null) {
    //   this.editedCandidate.experiences = [];
    // }
    // this.editedCandidate.experiences.push(this.editedExperience);
    // this.candidateService.update(this.editedCandidate).subscribe(resCandidate => {
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
