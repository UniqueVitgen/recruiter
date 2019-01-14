import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Interview, InterviewExtended} from '../../../../classes/interview';
import {DevFeedback} from '../../../../classes/dev-feedback';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {valid} from 'semver';
import {TypeCheckingWorker} from '../../../../workers/type-checking/type-checking.worker';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.scss']
})
export class InterviewFeedbackComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() feedback: DevFeedback;
  @Input() buttonEdit: boolean;
  @Output('focusoutAnyInput') outputOnFocusoutAnyInput: EventEmitter<DevFeedback> = new EventEmitter();
  @Output('saveClick') outputSaveClick: EventEmitter<DevFeedback> = new EventEmitter();
  @Output('clickDelete') outputClickDelete: EventEmitter<DevFeedback> = new EventEmitter();
  public editedFeedback: DevFeedback;
  private isSaved: boolean = true;
  constructor(private typeChekingWorker: TypeCheckingWorker) { }

  ngOnInit() {
  }
  onFocusAnyInput(value: boolean = true) {
    if (value) {
      if (this.isEdit) {
        this.isSaved = true;
        this.outputOnFocusoutAnyInput.emit(this.feedback);
      }
    } else {
      if (this.isEdit) {
        this.isSaved = false;
      }
    }
  }
  saveFeedback() {
    console.log('feedback', this.feedback);
    this.outputSaveClick.emit(this.feedback);
  }
  clickDelete(): void {
    this.outputClickDelete.emit(this.feedback);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isSaved) {
      this.editedFeedback = this.typeChekingWorker.parseObject(this.feedback);
    }
    // if (this.feedback) {
    //   this.feedbackForm = this.fb.group({
    //   });
    //
    // }
  }

}
