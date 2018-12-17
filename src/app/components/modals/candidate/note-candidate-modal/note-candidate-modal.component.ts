import {Component, Inject, OnInit} from '@angular/core';
import {Candidate} from '../../../../classes/candidate';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoteDialogData} from '../../../../interfaces/dialog/init/note-dialog-data';
import {Feedback} from '../../../../classes/feedback';
import {CandidateExperience} from '../../../../classes/candidate-experience';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {NameCandidateModalComponent} from '../name-candidate-modal/name-candidate-modal.component';
import {EnumWorker} from '../../../../workers/enum/enum.worker';
import {ExperienceDialogData} from '../../../../interfaces/dialog/init/experience-dialog-data';
import {FeedbackState} from '../../../../classes/feedback-state';
import {FeedbackService} from '../../../../services/feedback/feedback.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-note-candidate-modal',
  templateUrl: './note-candidate-modal.component.html',
  styleUrls: ['./note-candidate-modal.component.scss']
})
export class NoteCandidateModalComponent implements OnInit {

  public editedCandidate: Candidate;
  public editedFeedback: Feedback;
  public experienceResult: BaseDialogResult<Feedback>;
  public testFeedbackStates = ['OPEN', 'CLOSED'];
  public formNote: FormGroup;

  constructor(
    private candidateService: CandidateService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NameCandidateModalComponent>,
    public feedbackService: FeedbackService,
    public enumWorker: EnumWorker,
    @Inject(MAT_DIALOG_DATA) public data: NoteDialogData ) {
    // console.log('candidate', this.candidate);
    this.editedCandidate = Object.assign({}, this.data.sourceCandidate);
    if (this.data.isEdit) {
      this.editedFeedback = Object.assign(new CandidateExperience(), this.data.sourceFeedback);
    } else {
      this.editedFeedback = new Feedback();
    }
    this.editedFeedback.candidateId = this.data.sourceCandidate.id;
    this.formNote = this.fb.group({
      state: ['', Validators.compose([Validators.required])],
      text: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  editCandidate() {
    this.feedbackService.add(this.editedFeedback).subscribe(res => {
        this.experienceResult = {
          isEdit: false,
          resObject: res,
          success: true
        };
        this.dialogRef.close(this.experienceResult);
    });
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
