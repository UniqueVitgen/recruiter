import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialDesignModule } from './modules/material-design/material-design.module';

import { AppComponent } from './app.component';
import { CandidatePageComponent } from './pages/candidate-page/candidate-page.component';
import { ShortInfoUserComponent } from './components/cards/short-info-user/short-info-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidatePageComponent,
    ShortInfoUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
