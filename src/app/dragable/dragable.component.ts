import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {DragComponent} from '../drag/drag.component';
import {DragService} from './../drag.service';
import {UtilsService} from './../utils.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { fadeInAnimation } from '../animations';


@Component({
  selector: 'app-dragable',
  templateUrl: '../drag/drag.component.html',
  styleUrls: ['../drag/drag.component.scss'],
  animations: [
    trigger('dropTrigger', [
      state('closed', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('open', style({
        transform: 'scale(42)',
        zIndex: 1001,
        opacity: 0.1
      })),
      transition('closed => open', [
        animate('4.12s')
      ]),
      transition('open => closed', [
        animate('0.5s')
      ]),
    ]),
    fadeInAnimation
  ]
})
export class DragableComponent extends DragComponent implements OnInit {

  constructor(elem: ElementRef, service: DragService, utils: UtilsService, router: Router) { 
    super(elem, service, utils, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.backgroundColor = 'transparent';
  }

}
