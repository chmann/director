import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideUpAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideUpAnimation
  ]
})
export class AppComponent {
  title = 'director';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
