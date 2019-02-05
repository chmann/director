import { trigger, state, style, animate, transition, query, animateChild, group} from '@angular/animations';

export const slideUpAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AuthPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ top: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ top: '100%'}))
          ]),
          query(':enter', [
            animate('600ms ease-in', style({ top: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
  ]);

export const fadeInAnimation =
  trigger('fade', [
    state('pre', style({
      opacity: 0
    })),
    state('post', style({
      opacity: 1
    })),
    transition('pre => post', [
      animate('4.12s')
    ]),
    transition('post => pre', [ 
      animate('0.5s')
    ]),
  ]);