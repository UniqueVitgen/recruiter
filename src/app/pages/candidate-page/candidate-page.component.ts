import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidateService} from 'src/app/services/candidate/candidate.service';
import {Candidate} from 'src/app/classes/candidate';
import {EventNote} from '../../classes/event-note';
import {Interview, InterviewExtended} from '../../classes/interview';
import {EventNoteWorker} from '../../workers/event-note/event-note.worker';
import {FeedbackService} from '../../services/feedback/feedback.service';
import {InterviewService} from '../../services/interview/interview.service';
import {ImageCropperAvatarComponent} from '../../components/modals/candidate/image-cropper-avatar/image-cropper-avatar.component';
import {MatDialog} from '@angular/material';
import {CandidateDialogData} from '../../interfaces/dialog/init/candidate-dialog-data';
import {BaseDialogResult} from '../../interfaces/dialog/result/base-dialog-result';
import {DevFeedbackService} from '../../services/dev-feedback/dev-feedback.service';
import {Attachment} from '../../classes/attachment';
import {AlertWithButtonModalComponent} from '../../components/modals/alert-with-button-modal/alert-with-button-modal.component';
import {AlertWithButtonDialogData} from '../../interfaces/dialog/init/alert-with-button-dialog-data';
import {Subscription} from 'rxjs';
import {Feedback} from '../../classes/feedback';
import {DevFeedback} from '../../classes/dev-feedback';
import {CandidateExperience} from '../../classes/candidate-experience';
import {EventTimelineType} from '../../enums/event-timeline-type.enum';
import {InterviewModalComponent} from '../../components/modals/interview/interview-modal/interview-modal.component';
import {InterviewDialogDataInterface} from '../../interfaces/dialog/init/interview-dialog-data-interface';
import {AttachmentCandidateModalComponent} from '../../components/modals/candidate/attachment-candidate-modal/attachment-candidate-modal.component';
import {ExperienceCandidateModalComponent} from '../../components/modals/candidate/experience-candidate-modal/experience-candidate-modal.component';
import {NoteCandidateModalComponent} from '../../components/modals/candidate/note-candidate-modal/note-candidate-modal.component';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {Vacancy} from '../../classes/vacancy';
import {PositionService} from '../../services/position/position.service';
import {PositionModel} from '../../classes/position-model';
import {ContactsCandidateModalComponent} from '../../components/modals/candidate/contacts-candidate-modal/contacts-candidate-modal.component';
import {InterviewerService} from '../../services/interviewer/interviewer.service';
import {Interviewer} from '../../classes/interviewer';
import {TypeCheckingWorker} from '../../workers/type-checking/type-checking.worker';
import {ExperienceDialogData} from '../../interfaces/dialog/init/experience-dialog-data';
import {NoteDialogData} from '../../interfaces/dialog/init/note-dialog-data';
import {DevFeedbackModalComponent} from '../../components/modals/dev-feedback-modal/dev-feedback-modal.component';
import {DevFeedbackDialogData} from '../../interfaces/dialog/init/dev-feedback-dialog-data';
import {DeleteInterviewModalComponent} from '../../components/modals/interview/delete-interview-modal/delete-interview-modal.component';

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit, AfterContentChecked, AfterViewChecked, OnChanges {
  id: number;
  candidate: Candidate;
  eventNoteList: EventNote[];
  vacancies: Vacancy[];
  public height: number;
  public topString: string;
  navbarHeight: number = 60;
  scrollY: number = 0;
  positions: PositionModel[];
  interviewers: Interviewer[];
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('containerSticky') stickyContainer: ElementRef;
  @ViewChild('stickyChild') stickyChild: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private eventNoteWorker: EventNoteWorker,
    private typeCheckingWorker: TypeCheckingWorker,
    private feedbackService: FeedbackService,
    private devFeedbackService: DevFeedbackService,
    private candidateService: CandidateService,
    private interviewService: InterviewService,
    private vacancyService: VacancyService,
    private interviewerService: InterviewerService,
    private zone: NgZone,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.id = params['id'];
      this.getCandidate();
      this.getVacancies();
      this.getInterviewers();
    });
  }

  ngOnChanges() {

  }
  ngAfterViewChecked() {

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
      //console.log(this.stickyChild.nativeElement.getBoundingClientRect().top);
    //setTimeout(() => {
      this.height = $('#short-info').height();
      const wo = window.innerHeight - this.navbarHeight;
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (window.innerWidth > 990) {
        if (this.height > wo) {
          if (this.scrollY < st) {
            this.topString = 'calc(100vh - ' + this.height + 'px - 24px)';
          } else {
            this.topString = '85px';
          }
          this.scrollY = st <= 0 ? 0 : st;
        } else {
          this.topString = '85px';
        }
      } else {
        this.topString = 'auto';
      }
         // }
     //, 200);
  }
  updateCandidate(candidate: Candidate): Subscription {
    return this.candidateService.update(candidate).subscribe(resCandidate => {
      this.candidate = candidate;
    });
  }
  ngAfterContentChecked() {
  }
  clickEditContacts() {
    const dialogRef = this.dialog.open(ContactsCandidateModalComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.candidate,
          isEdit: true
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickSave.subscribe(resCandidate => {
      this.candidateService.update(resCandidate).subscribe(updatedCandidate => {
        this.getCandidate().add(() => {
          dialogRef.close();
        });
      });
    });
  }

  getVacancies() {
    this.vacancyService.getAll().subscribe( res => {
      this.vacancies = res;
      console.log('2', this.vacancies);
    });

  }

  clickAvatar() {
    const dialogRef = this.dialog.open(ImageCropperAvatarComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.candidate
        },
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<Candidate>) => {
      setTimeout(() => {
        this.getCandidate();
      }, 500);
    });
  }
  clickToolbar(eventTimelineType: EventTimelineType) {
    console.log('eventTimelineType', eventTimelineType);
    if (eventTimelineType === EventTimelineType.Interview) {
      this.addInterview();
    } else if (eventTimelineType === EventTimelineType.Attachment) {
      this.addAttachment();
    } else if (eventTimelineType === EventTimelineType.Experience) {
      this.addExperience();
    } else if (eventTimelineType === EventTimelineType.Note) {
      this.addNote();
    }
  }
  addInterview() {
    const todayStart: Date = new Date();
      const dialogRef = this.dialog.open(InterviewModalComponent, {
        data: <InterviewDialogDataInterface> {
                sourceCandidate: this.candidate,
                fixedCandidate: true,
                sourceInterviewers: this.interviewers
        },
        disableClose: true
      });
      dialogRef.componentInstance.outputClickSave.subscribe((resInterview: BaseDialogResult<InterviewExtended>) => {
        this.interviewService.add(resInterview.resObject).subscribe(res => {
          // this.getInterviews().add(() => {
          //   dialogRef.close();
          // });
          this.getCandidate().add(() => {
              dialogRef.close();
          });
        });
      });
  }
  changeInterview(event) {
    const todayStart: Date = new Date();
    const dialogRef = this.dialog.open(InterviewModalComponent, {
      data: <InterviewDialogDataInterface> {
        sourceCandidate: this.candidate,
        fixedCandidate: true,
        sourceInterviewers: this.interviewers,
        sourceInterview: event,
        isEdit: true
      },
      disableClose: true
    });
    dialogRef.componentInstance.outputClickSave.subscribe((resInterview: BaseDialogResult<InterviewExtended>) => {
      this.interviewService.update(resInterview.resObject).subscribe(res => {
        // this.getInterviews().add(() => {
        //   dialogRef.close();
        // });
        this.getCandidate().add(() => {
          dialogRef.close();
        });
      });
    });
    dialogRef.componentInstance.outputClickDelete.subscribe((resInterview: BaseDialogResult<InterviewExtended>) => {
      // this.deleteInterview(resInterview.resObject).add(() => {
      //   this.getInterview().add(() => {
      //     dialogRef.close();
      //   });
      // });
      this.clickDeleteInterview(resInterview.resObject, dialogRef);
    });
  }
  clickDeleteInterview(interview: InterviewExtended, customDialogRef) {
    const dialogRef = this.dialog.open(DeleteInterviewModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteInterview(interview).add(() => {
          customDialogRef.close();
          this.getCandidate();
        });
        // this.candidateService.delete(candidate.id).subscribe(res => {
        //   this.getAll();
        // });
      }
    });
  }
  addAttachment() {
    const dialogRef = this.dialog.open(AttachmentCandidateModalComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.candidate
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickSave.subscribe(resAttachment => {
      if (this.candidate.attachments == null) {
        this.candidate.attachments = [];
      }
      this.candidateService.uploadAttachment(this.candidate, resAttachment).subscribe(resCandidate => {
        setTimeout(() => {
          this.getCandidate().add(() => {
            dialogRef.close();
          });
        }, 500);
      });
    });
  }
  addExperience() {
    const dialogRef = this.dialog.open(ExperienceCandidateModalComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.candidate
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickSave.subscribe(resExperience => {
      if (this.candidate.experiences == null) {
        this.candidate.experiences = [];
      }
      this.candidate.experiences.push(resExperience);
      this.candidateService.update(this.candidate).subscribe(resCandidate => {
        this.getCandidate().add(() => {
          dialogRef.close();
        });
      });
    });
  }
  changeExperience(event) {
    const dialogRef = this.dialog.open(ExperienceCandidateModalComponent, {
        data: <ExperienceDialogData> {
          sourceCandidate: this.candidate,
          sourceExperience: event,
          isEdit: true
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickSave.subscribe(resExperience => {
      console.log('resExperience', resExperience);
      this.candidate.experiences = this.candidate.experiences.map((experience) => {
        if (experience.id === resExperience.id) {
          return resExperience;
        } else {
          return experience;
        }
      });
      this.candidateService.update(this.candidate).subscribe(resCandidate => {
        this.getCandidate().add(() => {
          dialogRef.close();
        });
      });
    });
  }
  addNote() {
    const dialogRef = this.dialog.open(NoteCandidateModalComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.candidate
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickSave.subscribe((resFeedback: Feedback) => {
      this.feedbackService.add(resFeedback).subscribe(res => {
        this.getCandidate().add(() => {
          dialogRef.close();
        });
      });
    });
  }
  changeNote(event) {
    const dialogRef = this.dialog.open(NoteCandidateModalComponent, {
        data: <NoteDialogData> {
          sourceCandidate: this.candidate,
          sourceFeedback: event,
          isEdit: true
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickSave.subscribe((resFeedback: Feedback) => {
      this.feedbackService.update(resFeedback).subscribe(res => {
        this.getCandidate().add(() => {
          dialogRef.close();
        });
      });
    });
  }
  changeDevFeedback(event) {
    const dialogRef = this.dialog.open(DevFeedbackModalComponent, {
        data: <DevFeedbackDialogData> {
          sourceCandidate: this.candidate,
          sourceDevFeedback: event,
          isEdit: true
        },
        disableClose: true,
      minWidth: '400px'
      },
    );
    dialogRef.componentInstance.outputClickSave.subscribe((resFeedback: DevFeedback) => {
      this.devFeedbackService.update(resFeedback).subscribe(res => {
        this.getCandidate().add(() => {
          dialogRef.close();
        });
      });
    });
  }
  deleteTimelineItem(index: number) {
    const object = this.eventNoteList[index];
    console.log(object);
    if (this.eventNoteWorker.isCV(object)) {
      this.alertDeleteAttachment(<Attachment>object);
    } else if (this.eventNoteWorker.isImg(object)) {
      this.alertDeleteImg(<Attachment>object);
    } else if (this.eventNoteWorker.isNote(object)) {
      this.alertDeleteFeedback(<any>object);
    } else if (this.eventNoteWorker.isDevFeedback(object)) {
      this.alertDeleteDevFeedback(<any>object);
    } else if (this.eventNoteWorker.isExperience(object)) {
      this.alertDeleteExperience(<any>object);
    } else if (this.eventNoteWorker.isInterview(object)) {
        this.alertDeleteInverview(<Interview>object);
      }
  }
  changeTimelineItem(object: any) {
    // this.eventNoteList = this.eventNoteList.map(event => {
    //   if (event.id === object.id) {
    //     return object;
    //   } else {
    //     return event;
    //   }
    // });
    if (this.eventNoteWorker.isAttachement(object)) {
      this.candidate.attachments = this.candidate.attachments.map((attachment) => {
        if (attachment.id === object.id) {
          return object;
        } else {
          return attachment;
        }
      });
    } else if (this.eventNoteWorker.isNote(object)) {
      this.feedbackService.update(object).subscribe(res => {
        // this.getCandidate();
      });
    } else if (this.eventNoteWorker.isDevFeedback(object)) {
      this.devFeedbackService.update(object).subscribe(res => {
      });
    } else if (this.eventNoteWorker.isExperience(object)) {
      this.candidate.experiences = this.candidate.experiences.map((attachment) => {
        if (attachment.id === object.id) {
          return object;
        } else {
          return attachment;
        }
      });
      // this.eventNoteList = this.eventNoteList.map(event => {
      //   if (event.id === object.id) {
      //     return object;
      //   } else {
      //     return event;
      //   }
      // });
      console.log('candidate', this.candidate, this.eventNoteList);
      this.candidateService.update(this.candidate).subscribe(resMessage => {
      //   this.zone.runOutsideAngular(() => {
          this.getCandidate(false);
      //   });
      });
    } else if (this.eventNoteWorker.isInterview(object)) {
      this.interviewService.update(object).subscribe( res => {
        this.getCandidate();
        // this.getCandidate();
      });
    }
  }
  changeEvent(event) {
    if (this.eventNoteWorker.isInterview(event)) {
      // this.addInterview();
      this.changeInterview(event);
    } else if (this.eventNoteWorker.isAttachement(event)) {
      // this.addAttachment();
    } else if (this.eventNoteWorker.isExperience(event)) {
      this.changeExperience(event);
    } else if (this.eventNoteWorker.isNote(event)) {
      this.changeNote(event);
    } else if (this.eventNoteWorker.isDevFeedback(event)) {
      this.changeDevFeedback(event)
    }
  }
  alertDeleteAttachment(attachment: Attachment) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this attachment?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      this.deleteAttachment(attachment).add(() => {
        this.getCandidate().add(() => {dialogRef.close(); } );
      });
    });
  }
  alertDeleteExperience(experience: CandidateExperience): void {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this experience?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      this.deleteExperience(experience).add(() => {
        this.getCandidate().add(() => {dialogRef.close(); } );
      });
    });
  }
  alertDeleteImg(attachment: Attachment) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this image?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      this.deleteAttachment(attachment).add(() => {
        this.getCandidate().add(() => {dialogRef.close(); } );
      });
    });
  }
  alertDeleteFeedback(feedback: Feedback) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this feedback?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      this.deleteFeedback(feedback).add(() => {
        this.getCandidate().add(() => {dialogRef.close();
        });
      });
    });
  }
  alertDeleteDevFeedback(devFeedback: DevFeedback) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this interview feedback?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      this.deleteDevFeedback(devFeedback).add(() => {
        this.getCandidate().add(() => {dialogRef.close();
        });
      });
    });
  }
  alertDeleteInverview(interview: Interview) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this interview?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      this.deleteInterview(interview).add(() => {
        this.getCandidate().add(() => {dialogRef.close();
        });
      });
    });
  }
  deleteExperience(experience: CandidateExperience): Subscription {
    this.candidate.experiences = this.candidate.experiences.filter((attachment => {
      return experience.id !== attachment.id;
    }));
    return this.candidateService.update(this.candidate).subscribe(resCandidate => {});
  }
  deleteAttachment(object: Attachment): Subscription {
    this.candidate.attachments = this.candidate.attachments.filter((attachment => {
      return object.id !== attachment.id;
    }));
    return this.candidateService.update(this.candidate).subscribe(resCandidate => {});
  }
  deleteFeedback(object: Feedback): Subscription {
    return this.feedbackService.delete(object).subscribe(res => {});
  }
  deleteDevFeedback(object: DevFeedback): Subscription {
    return this.devFeedbackService.delete(object).subscribe(res => {});
  }
  deleteInterview(interview: Interview): Subscription {
    return this.interviewService.delete(interview).subscribe(res => {});
  }
  addTimelineItem(candidate: Candidate) {
    this.getCandidate();
  }
  getCandidate(withTimeline: boolean = true): Subscription {
    return this.candidateService.get(this.id).subscribe(res => {
      this.candidate = res;
      if (withTimeline) {
        this.candidateService.getTimeline(this.candidate).subscribe(resTimeline => {
          return this.eventNoteList = resTimeline;
          // this.eventNoteList.sort((a, b) => {
          //   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          // });
          // console.log('eventNoteList', this.eventNoteList);
        });
      }
      console.log(this.eventNoteList);
      console.log('res', res);
    });
  }
  getTimeline(): Subscription {
    return this.candidateService.getTimeline(this.candidate).subscribe(resTimeline => {
      this.eventNoteList = resTimeline;
    });
  }
  getInterviewers(): Subscription {
    return this.interviewerService.getAll().subscribe(resInterviewers => {
      this.interviewers = resInterviewers;
    });
  }

}
