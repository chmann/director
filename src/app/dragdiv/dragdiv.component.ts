import { Component, OnInit, ElementRef } from '@angular/core';
import {DragService} from './../drag.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dragdiv',
  inputs: ['image', 'y', 'x', 'w', 'h', 'z', 'dropCallback'],
  templateUrl: './dragdiv.component.html',
  styleUrls: ['./dragdiv.component.css'],
  animations: [
    trigger('dropTrigger', [
      state('closed', style({
        transform: 'scale(1)'
      })),
      state('open', style({
        transform: 'scale(42)',
        zIndex: 1001
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
export class DragdivComponent implements OnInit {
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
  self : DragdivComponent;

  constructor(elem: ElementRef, private service: DragService, private router: Router) {
    this.thisComponent = elem.nativeElement;
  }
  
  ngOnInit() {
    console.log('init dragdiv', this);
    this.top = this.y;
    this.left = this.x;
    this.lastPoint = {x: this.left, y: this.top};
    this.width = this.w || this.h || 100;
    this.height = this.h || this.w || 100;
    this.dragid = this.guidGenerator();
    this.setBounds();
  }

  setBounds() {
    this.bounds = this.thisComponent.children[0].getBoundingClientRect();
    this.service.addUpdateTarget(this.dragid, this.bounds, this.handleDrop, this);
    console.log(this.bounds);
  }

  handleDrop() {
    console.log(this, 'Dropped!')
    if (this.dropCallback) this.dropCallback();
    if (this['obj']) {
      this['obj'].isTriggered = true;
      setTimeout(() => {this['obj'].isTriggered = false; this['obj'].router.navigate(['/', 'bros']);}, 5256);
    }
  }

  dragStart(e) {
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
    if (!this.dragging) return;
    e.preventDefault();
    if (e.touches) {
      e = e.touches[0]
    }
    let diff = {x: e.clientX - this.lastPoint.x, y: e.clientY - this.lastPoint.y};
    this.top += diff.y;
    this.left += diff.x;
    this.lastPoint.x = e.clientX;
    this.lastPoint.y = e.clientY;
  }

  guidGenerator() {
    let S4 = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

}
