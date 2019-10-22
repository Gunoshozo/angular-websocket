import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {notification} from './components/notification/notification.component'


const routes: Routes = [
  {path:'',component: notification}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
