import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CandidatePageComponent } from './pages/candidate-page/candidate-page.component';
import { ShortInfoUserComponent } from './components/cards/short-info-user/short-info-user.component';
import { NavbarItcharComponent } from './components/navbars/navbar-itchar/navbar-itchar.component';
import { ModalComponentComponent } from './components/modals/modal-component/modal-component.component';
import { NameCandidateModalComponent } from './components/modals/name-candidate-modal/name-candidate-modal.component';
import { StatusCandidateModalComponent } from './components/modals/status-candidate-modal/status-candidate-modal.component';
import { PositionCandidateModalComponent } from './components/modals/position-candidate-modal/position-candidate-modal.component';
import { CandidateAvatarComponent } from './components/avatar/candidate-avatar/candidate-avatar.component'; import { CandidateCvListComponent } from './components/cards/candidate-cv-list/candidate-cv-list.component';
import { CandidateAttachmentComponent } from './components/items/candidate-attachment/candidate-attachment.component';
import { AttachmentCandidateModalComponent } from './components/modals/attachment-candidate-modal/attachment-candidate-modal.component';
import { NotesCardComponent } from './components/cards/notes-card/notes-card.component';
import { ContactsUserComponent } from './components/cards/contacts-user/contacts-user.component';
import { ExperienceUserComponent } from './components/cards/experience-user/experience-user.component';
import { CandidateDashboardPageComponent } from './pages/candidate-dashboard-page/candidate-dashboard-page.component';
import { JobDescriptionDashboardPageComponent } from './pages/job-description-dashboard-page/job-description-dashboard-page.component';
import { CandidateDashboardItemComponent } from './components/items/dashboard/candidate-dashboard-item/candidate-dashboard-item.component';
import { CandidateDashboardComponent } from './components/dashboards/candidate-dashboard/candidate-dashboard.component';
import { SearchInputComponent } from './components/inputs/search-input/search-input.component';
import { JobDescriptionDashboardComponent } from './components/dashboards/job-description-dashboard/job-description-dashboard.component';
import { JobDescriptionDashboardItemComponent } from './components/items/dashboard/job-description-dashboard-item/job-description-dashboard-item.component';
import { JobDescriptionPageComponent } from './pages/job-description-page/job-description-page.component';
import { JobDescriptionShortInfoComponent } from './components/cards/job-description-short-info/job-description-short-info.component';
import { JobDescriptionRequirementsComponent } from './components/cards/job-description-requirements/job-description-requirements.component';
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component';
import { InterviewCalendarComponent } from './components/calendar/interview-calendar/interview-calendar.component';
import { InterviewModalComponent } from './components/modals/interview-modal/interview-modal.component';
import { CandidateTimelineComponent } from './components/timelines/candidate-timeline/candidate-timeline.component';
import { InterviewCandidateTimelineItemComponent } from './components/items/timeline/interview-candidate-timeline-item/interview-candidate-timeline-item.component';
import { NoteCandidateTimelineItemComponent } from './components/items/timeline/note-candidate-timeline-item/note-candidate-timeline-item.component';
import { AttachmentCandidateTimelineItemComponent } from './components/items/timeline/attachment-candidate-timeline-item/attachment-candidate-timeline-item.component';
import { ExperienceCandidateTimelineItemComponent } from './components/items/timeline/experience-candidate-timeline-item/experience-candidate-timeline-item.component';


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
    ExperienceCandidateTimelineItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialDesignModule,
    AvatarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponentComponent,
    NameCandidateModalComponent,
    StatusCandidateModalComponent,
    PositionCandidateModalComponent,
    InterviewModalComponent
  ],
  schemas: [NO_ERRORS_SCHEMA] // add this line
})
export class AppModule { }
