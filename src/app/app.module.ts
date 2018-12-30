import { BrowserModule } from '@angular/platform-browser';
import {forwardRef, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import {ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import {FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule} from '@angular/forms';
// import {CalendarModule as Calendar2Module} from 'ap-angular2-fullcalendar';
import * as moment from 'moment';
import * as $ from 'jquery';
// import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
// import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';


import { AppComponent } from './app.component';
import { CandidatePageComponent } from './pages/candidate-page/candidate-page.component';
import { ShortInfoUserComponent } from './components/cards/candidate/short-info-user/short-info-user.component';
import { NavbarItcharComponent } from './components/navbars/navbar-itchar/navbar-itchar.component';
import { ModalComponentComponent } from './components/modals/modal-component/modal-component.component';
import { NameCandidateModalComponent } from './components/modals/candidate/name-candidate-modal/name-candidate-modal.component';
import { StatusCandidateModalComponent } from './components/modals/candidate/status-candidate-modal/status-candidate-modal.component';
import { PositionCandidateModalComponent } from './components/modals/candidate/position-candidate-modal/position-candidate-modal.component';
import { CandidateAvatarComponent } from './components/avatar/candidate-avatar/candidate-avatar.component';
import { CandidateCvListComponent } from './components/cards/candidate/candidate-cv-list/candidate-cv-list.component';
import { CandidateAttachmentComponent } from './components/items/candidate-attachment/candidate-attachment.component';
import { AttachmentCandidateModalComponent } from './components/modals/candidate/attachment-candidate-modal/attachment-candidate-modal.component';
import { NotesCardComponent } from './components/cards/candidate/notes-card/notes-card.component';
import { ContactsUserComponent } from './components/cards/candidate/contacts-user/contacts-user.component';
import { ExperienceUserComponent } from './components/cards/candidate/experience-user/experience-user.component';
import { CandidateDashboardPageComponent } from './pages/candidate-dashboard-page/candidate-dashboard-page.component';
import { JobDescriptionDashboardPageComponent } from './pages/job-description-dashboard-page/job-description-dashboard-page.component';
import { CandidateDashboardItemComponent } from './components/items/dashboard/candidate-dashboard-item/candidate-dashboard-item.component';
import { CandidateDashboardComponent } from './components/dashboards/candidate-dashboard/candidate-dashboard.component';
import { SearchInputComponent } from './components/inputs/search-input/search-input.component';
import { JobDescriptionDashboardComponent } from './components/dashboards/job-description-dashboard/job-description-dashboard.component';
import { JobDescriptionDashboardItemComponent } from './components/items/dashboard/job-description-dashboard-item/job-description-dashboard-item.component';
import { JobDescriptionPageComponent } from './pages/job-description-page/job-description-page.component';
import { JobDescriptionShortInfoComponent } from './components/cards/job-description/job-description-short-info/job-description-short-info.component';
import { JobDescriptionRequirementsComponent } from './components/cards/job-description/job-description-requirements/job-description-requirements.component';
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component';
import { InterviewCalendarComponent } from './components/calendar/interview-calendar/interview-calendar.component';
import { InterviewModalComponent } from './components/modals/interview/interview-modal/interview-modal.component';
import { CandidateTimelineComponent } from './components/timelines/candidate-timeline/candidate-timeline.component';
import { InterviewCandidateTimelineItemComponent } from './components/items/timeline/interview-candidate-timeline-item/interview-candidate-timeline-item.component';
import { NoteCandidateTimelineItemComponent } from './components/items/timeline/note-candidate-timeline-item/note-candidate-timeline-item.component';
import { AttachmentCandidateTimelineItemComponent } from './components/items/timeline/attachment-candidate-timeline-item/attachment-candidate-timeline-item.component';
import { ExperienceCandidateTimelineItemComponent } from './components/items/timeline/experience-candidate-timeline-item/experience-candidate-timeline-item.component';
import { CandidateTimelineToolbarComponent } from './components/toolbar/candidate-timeline-toolbar/candidate-timeline-toolbar.component';
import { JobDescriptionModalComponent } from './components/modals/job-description/job-description-modal/job-description-modal.component';

import { InterviewPageComponent } from './pages/interview-page/interview-page.component';
import { InterviewShortInfoComponent } from './components/cards/interview/interview-short-info/interview-short-info.component';
import { InterviewFeedbackComponent } from './components/cards/interview/interview-feedback/interview-feedback.component';
import { InterviewCandidateComponent } from './components/cards/interview/interview-candidate/interview-candidate.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {CustExtBrowserXhr} from './services/ext/cust-ext-browser-xhr';
import {BrowserXhr, HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { CandidateModalComponent } from './components/modals/candidate/candidate-modal/candidate-modal.component';
import { PhoneMaskDirective } from './directives/phone-mask/phone-mask.directive';
import {SHARED_FORM_DIRECTIVES} from '@angular/forms/src/directives';
import {TextMaskModule} from 'angular2-text-mask';
import { LimitToDirective } from './directives/limit-to/limit-to.directive';
import { ExperienceCandidateModalComponent } from './components/modals/candidate/experience-candidate-modal/experience-candidate-modal.component';
import { NoteCandidateModalComponent } from './components/modals/candidate/note-candidate-modal/note-candidate-modal.component';
import {MAT_DATE_LOCALE, MatExpansionModule} from '@angular/material';
import { JobDashboardExpansionPanelComponent } from './components/expansion-panels/job-dashboard-expansion-panel/job-dashboard-expansion-panel.component';
import { ImageCandiateTimelineItemComponent } from './components/items/timeline/image-candiate-timeline-item/image-candiate-timeline-item.component';
import { DeleteVacancyDialogComponent } from './components/modals/delete-vacancy-dialog/delete-vacancy-dialog.component';
import {CalendarModule} from './modules/calendar/calendar.module';
import {DevExpressModule} from './modules/dev-express/dev-express.module';
import {SyncfunsionModule} from './modules/syncfunsion/syncfunsion.module';
import {AngularBootstrapModule} from './modules/angular-bootstrap/angular-bootstrap.module';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ExistedCandidatesModalWindowComponent } from './components/modals/existed-candidates-modal-window/existed-candidates-modal-window.component';
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import {TranslateWorker} from './workers/translate/translate.worker';
import { LocalDatePipe } from './pipes/local-date/local-date.pipe';
import {PipesModule} from './modules/pipes/pipes.module';
import { CustomTimepickerComponent } from './components/timepickers/custom-timepicker/custom-timepicker.component';
import {StickyModule} from 'ng2-sticky-kit';
import {Ng2StickyModule} from 'ng2-sticky';
import {PrimeNGModule} from './modules/prime-ng/prime-ng.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { VacancyInterviewExpansionPanelComponent } from './components/expansion-panels/vacancy-interview-expansion-panel/vacancy-interview-expansion-panel.component';
import { CandidateInterviewExpansionPanelComponent } from './components/expansion-panels/candidate-interview-expansion-panel/candidate-interview-expansion-panel.component';
// import {AlyleUIModule} from '@alyle/ui';
// import {LyThemeModule} from '@alyle/ui';
// import {LyButtonModule} from '@alyle/ui/button';
// import {LyResizingCroppingImageModule} from '@alyle/ui/resizing-cropping-images';
// import {LyToolbarModule} from '@alyle/ui/toolbar';
// import { LyCommonModule } from '@alyle/ui';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    CandidatePageComponent,
    ShortInfoUserComponent,
    NavbarItcharComponent,
    ModalComponentComponent,
    NameCandidateModalComponent,
    StatusCandidateModalComponent,
    PositionCandidateModalComponent,
    CandidateAvatarComponent,
    AttachmentCandidateModalComponent,
    CandidateAvatarComponent,
    CandidateCvListComponent,
    CandidateAttachmentComponent,
    ContactsUserComponent,
    ExperienceUserComponent,
    NotesCardComponent,
    CandidateDashboardPageComponent,
    JobDescriptionDashboardPageComponent,
    CandidateDashboardItemComponent,
    CandidateDashboardComponent,
    SearchInputComponent,
    JobDescriptionDashboardComponent,
    JobDescriptionDashboardItemComponent,
    JobDescriptionPageComponent,
    JobDescriptionShortInfoComponent,
    JobDescriptionRequirementsComponent,
    CalendarPageComponent,
    InterviewCalendarComponent,
    InterviewModalComponent,
    CandidateTimelineComponent,
    InterviewCandidateTimelineItemComponent,
    NoteCandidateTimelineItemComponent,
    AttachmentCandidateTimelineItemComponent,
    ExperienceCandidateTimelineItemComponent,
    CandidateTimelineToolbarComponent,
    JobDescriptionModalComponent,
    InterviewPageComponent,
    InterviewShortInfoComponent,
    InterviewFeedbackComponent,
    InterviewCandidateComponent,
    CandidateModalComponent,
    PhoneMaskDirective,
    LimitToDirective,
    ExperienceCandidateModalComponent,
    NoteCandidateModalComponent,
    JobDashboardExpansionPanelComponent,
    ImageCandiateTimelineItemComponent,
    DeleteVacancyDialogComponent,
    CalendarPageComponent,
    ExistedCandidatesModalWindowComponent,
    AlertModalComponent,
    LocalDatePipe,
    CustomTimepickerComponent,
    VacancyInterviewExpansionPanelComponent,
    CandidateInterviewExpansionPanelComponent
    // ,
    // CalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialDesignModule,
    AvatarModule,
    FormsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    TextMaskModule,
    MatExpansionModule,
    CalendarModule,
    // Calendar2Module,
    DevExpressModule,
    SyncfunsionModule,
    AngularBootstrapModule,
    PrimeNGModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PipesModule,
    StickyModule,
    // AlyleUIModule.forRoot({
    //   name: 'default'
    // }),
    // LyCommonModule,
    // Set theme
    // LyThemeModule.setTheme('minima-light'),
    // Add components
    // LyButtonModule,
    // LyToolbarModule,
    // LyResizingCroppingImageModule
    // MDBBootstrapModule.forRoot(),
    // NgxMaterialTimepickerModule.forRoot()
    // ,
    // InternationalPhoneNumberModule
  ],
  providers: [
  //   {
  //   provide: LOCALE_ID,
  //   deps: [TranslateWorker],
  //   useFactory: (sessionService) => sessionService.getLanguage()
  // }
  // ,
  //   { provide: MAT_DATE_LOCALE,
  //     deps: [TranslateWorker],
  //     useFactory: (sessionService) => sessionService.getLanguage() }
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponentComponent,
    NameCandidateModalComponent,
    StatusCandidateModalComponent,
    PositionCandidateModalComponent,
    InterviewModalComponent,
    JobDescriptionModalComponent,
    CandidateModalComponent,
    AttachmentCandidateModalComponent,
    ExperienceCandidateModalComponent,
    NoteCandidateModalComponent,
    DeleteVacancyDialogComponent,
    ExistedCandidatesModalWindowComponent,
    AlertModalComponent
  ],
  schemas: [NO_ERRORS_SCHEMA] // add this line
})
export class AppModule {
}
