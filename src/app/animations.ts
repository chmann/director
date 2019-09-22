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

export const fadeRouteAnimation = trigger('fadeAnimation', [
  // The '* => *' will trigger the animation to change between any two states
  transition('* <=> *', [
    // The query function has three params.
    // First is the event, so this will apply on entering or when the element is added to the DOM.
    // Second is a list of styles or animations to apply.
    // Third we add a config object with optional set to true, this is to signal
    // angular that the animation may not apply as it may or may not be in the DOM.
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      // here we apply a style and use the animate function to apply the style over 0.3 seconds
      [style({ opacity: 1 }), animate('0.1s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.1s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

export const fadeInAnimation =
  trigger('fade', [
    state('pre', style({
      opacity: 0.0
    })),
    state('post', style({
      opacity: 100
    })),
    transition('pre => post', [
      animate('2.0s')
    ]),
    transition('post => pre', [ 
      animate('0.5s')
    ]),
  ]);