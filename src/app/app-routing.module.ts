import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HelloComponent} from './hello/hello.component'
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: 'bros', component: AuthComponent, data: {animation: 'AuthPage'}},
  {path: '', component: HelloComponent, data: {animation: 'HomePage'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
