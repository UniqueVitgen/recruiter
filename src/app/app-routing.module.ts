import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CandidatePageComponent } from './pages/candidate-page/candidate-page.component';
import { CandidateDashboardPageComponent } from './pages/candidate-dashboard-page/candidate-dashboard-page.component';
import { JobDescriptionDashboardPageComponent } from './pages/job-description-dashboard-page/job-description-dashboard-page.component';
import {JobDescriptionPageComponent} from './pages/job-description-page/job-description-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
// import {RouterFactory} from './factory/router.factory'

const routes: Routes = [
  {
    path: '', redirectTo: 'candidate', pathMatch: 'full'
  },
  {
    path: 'candidate/:id', component: CandidatePageComponent
  },
  {
    path: 'candidate', component: CandidateDashboardPageComponent
  },
  {
    path: 'job-description', component: JobDescriptionDashboardPageComponent
  },
  {
    path: 'job-description/:id', component: JobDescriptionPageComponent
  },
  {
    path: 'calendar', component: CalendarPageComponent
  },
  // {
  //   path: 'guest', loadChildren: './components/guest/guest.module#GuestModule'
  // },
  // {
  //   path: 'user', loadChildren: './components/user/user.module#UserModule'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule {

  constructor() {

    // _router.events.subscribe(
    //   (route) =>{
    //     if(route.url == '/user/admin' || route.url == '/user/client' || route.url == '/user/courier'){
    //       RouterFactory.setCurrentRoute(route.url)
    //     }
    //   }
    // )

  }

}
