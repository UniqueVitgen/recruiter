import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Candidate} from '../../../../classes/candidate';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NameCandidateModalComponent} from '../name-candidate-modal/name-candidate-modal.component';
import {EnumWorker} from '../../../../workers/enum/enum.worker';
import {CandidateExperience} from '../../../../classes/candidate-experience';
import {ExperienceDialogData} from '../../../../interfaces/dialog/init/experience-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttachmentForm} from '../../../../classes/html/attachment-form';

@Component({
  selector: 'app-experience-candidate-modal',
  templateUrl: './experience-candidate-modal.component.html',
  styleUrls: ['./experience-candidate-modal.component.scss']
})
export class ExperienceCandidateModalComponent implements OnInit {

  public editedCandidate: Candidate;
  public editedExperience: CandidateExperience;
  public experienceResult: BaseDialogResult<CandidateExperience>;
  public formExperience: FormGroup;
  @Output('clickSave') outputClickSave: EventEmitter<CandidateExperience> = new EventEmitter();

  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<NameCandidateModalComponent>,
    public enumWorker: EnumWorker,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ExperienceDialogData ) {
    // console.log('candidate', this.candidate);
    this.editedCandidate = Object.assign({}, this.data.sourceCandidate);
    if (this.data.isEdit) {
      this.editedExperience = Object.assign(new CandidateExperience(), this.data.sourceExperience);
    } else {
      this.editedExperience = new CandidateExperience();
    }
    this.formExperience = this.fb.group({
      companyName: ['', Validators.compose([Validators.required])],
      dateFrom: ['', Validators.compose([Validators.required])],
      dateTo: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  editCandidate() {
    this.outputClickSave.emit(this.editedExperience);
    // if (this.editedCandidate.experiences == null) {
    //   this.editedCandidate.experiences = [];
    // }
    // this.editedCandidate.experiences.push(this.editedExperience);
    // this.candidateService.update(this.editedCandidate).subscribe(resCandidate => {
    //   this.experienceResult = {
    //     isEdit: false,
    //     resObject: null,
    //     success: true
    //   };
    //   this.dialogRef.close(this.experienceResult);
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
