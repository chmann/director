import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { DragComponent } from './drag/drag.component';
import { AuthComponent } from './auth/auth.component';
import { DragableComponent } from './dragable/dragable.component';
import { VictoryComponent } from './victory/victory.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    DragComponent,
    AuthComponent,
    DragableComponent,
    VictoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
