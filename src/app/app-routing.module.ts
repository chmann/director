import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HelloComponent} from './hello/hello.component'
import { AuthComponent } from './auth/auth.component';
import { VictoryComponent } from './victory/victory.component';

const routes: Routes = [
  {path: 'victory', component: VictoryComponent, data: {animation: 'AuthPage'}},
  {path: 'bros', component: AuthComponent, data: {animation: 'AuthPage'}},
  {path: '', component: HelloComponent, data: {animation: 'HomePage'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
