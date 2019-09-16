import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeRouteAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    //fadeRouteAnimation
  ]
})
export class AppComponent {
  title = 'director';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
