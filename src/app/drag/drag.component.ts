import { Component, OnInit, ElementRef } from '@angular/core';
import {DragService} from './../drag.service';
import {UtilsService} from './../utils.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drag',
  inputs: ['image', 'y', 'x', 'w', 'h', 'z', 'dropCallback', 'lock'],
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css'],
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
  ]
})
export class DragComponent implements OnInit {
  x = 0; y = 0;
  w = 0; h = 0;
  z = 3;
  dropCallback = null;
  top = 0; left = 0;
  width = 100; height = 100;
  image = '';
  backgroundColor = 'transparent';
  dragging = false;
  lastPoint = {x: this.left, y: this.top};
  target = false;
  thisComponent : any;
  bounds : DOMRect;
  dragid : string;
  isTriggered = false;
  self : DragComponent;
  lock = false;
  updatingPosition = false;

  constructor(elem: ElementRef, private service: DragService, private utils: UtilsService, private router: Router) {
    this.thisComponent = elem.nativeElement;
  }
  
  ngOnInit() {
    this.top = this.y;
    this.left = this.x;
    this.lastPoint = {x: this.left, y: this.top};
    this.width = this.w || this.h || 100;
    this.height = this.h || this.w || 100;
    this.dragid = this.utils.GUID();
    this.setBounds();

    //Ensure Drag End is called when mouseup occurs when mouse is no longer over target
    document.addEventListener("mouseup", () => {this.dragEnd(null);});
    document.addEventListener("mousemove", (e) => {this.handleDrag(e);});
  }

  setBounds() {
    this.bounds = this.thisComponent.children[0].getBoundingClientRect();
    this.service.Update(this.dragid, this.bounds, this.handleDrop, this);
  }

  handleDrop() {
    if (this.dropCallback) this.dropCallback();
    if (this['obj']) {
      this['obj'].isTriggered = true;
      setTimeout(() => {this['obj'].isTriggered = false; this['obj'].router.navigate(['/', 'bros']);}, 5256);
    }
  }

  dragStart(e) {
    if (this.lock) return;
    if (e.touches) {
      e = e.touches[0]
    }
    this.lastPoint.x = e.clientX;
    this.lastPoint.y = e.clientY;
    this.dragging = true;
  }

  dragEnd(e) {
    if (!this.dragging) return;
    this.dragging = false;
    this.setBounds();
    this.service.onDrop(this.dragid, this.bounds);
  }

  handleDrag(e) {
    if (!this.dragging || this.lock || this.updatingPosition) return;
    e.preventDefault();
    this.updatingPosition = true;
    //Convert touch event to mouse event
    if (e.touches) {
      e = e.touches[0]
    }

    let diff = {x: e.clientX - this.lastPoint.x, y: e.clientY - this.lastPoint.y};
    this.top += diff.y;
    this.left += diff.x;
    this.lastPoint.x = e.clientX;
    this.lastPoint.y = e.clientY;

    this.enforceBounds();
    this.updatingPosition = false;
  }

  enforceBounds() {
    let maxx = window.innerWidth - this.width;
    let maxy = window.innerHeight - this.height;

    if (this.top < 0) this.top = 0;
    if (this.top > maxy) this.top = maxy;
    if (this.left < 0) this.left = 0;
    if (this.left > maxx) this.left = maxx;

  }

  

}
