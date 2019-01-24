import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HelloComponent} from './hello/hello.component'
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: 'bros', component: AuthComponent},
  {path: '', component: HelloComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
