import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CandidatePageComponent } from './pages/candidate-page/candidate-page.component';

// import {RouterFactory} from './factory/router.factory'

const routes: Routes = [
  {
    path: '', redirectTo: 'candidate/0', pathMatch: 'full'
  },
  {
    path: 'candidate/:id', component: CandidatePageComponent
  }
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