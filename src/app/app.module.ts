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
import { CandidateAvatarComponent } from './components/avatar/candidate-avatar/candidate-avatar.component';


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
    CandidateAvatarComponent
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
    PositionCandidateModalComponent
  ],
  schemas:      [ NO_ERRORS_SCHEMA ] // add this line
})
export class AppModule { }
