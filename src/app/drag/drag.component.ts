import { Component, OnInit, ElementRef, Input, Output } from '@angular/core';
import {DragService} from './../drag.service';
import {UtilsService} from './../utils.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drag',
  inputs: ['image', 'y', 'x', 'w', 'h', 'z', 'dropCallback', 'lock'],
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
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
  @Input() x = 0; 
  @Input() y = 0;
  @Input() w = 0; 
  @Input() h = 0;
  @Input() z = 3;
  @Input() dropCallback = null;
  @Input() image : string;
  @Input() backgroundColor = 'transparent';
  @Input() lock = false;
  @Input() preventDrop = true;
  @Input() conflicted = false;
  @Input() overValidTarget = false;

  top = 0; 
  left = 0;
  width = 100; 
  height = 100;
  dragging = false;
  lastPoint = {x: this.left, y: this.top};
  target = false;
  thisComponent : any;
  bounds : DOMRect;
  dragid : string;
  isTriggered = false;
  conflictedOff = false;

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
    setTimeout(() => this.setBounds(), 500);

    //Ensure Drag End is called when mouseup occurs when mouse is no longer over target
    document.addEventListener("mouseup", () => {this.dragEnd(null);});
    document.addEventListener("mousemove", (e) => {this.handleDrag(e);});
  }

  setBounds() {
    this.bounds = this.thisComponent.children[0].getBoundingClientRect();
    this.service.Update(this.dragid, this.bounds, this.handleDrop, this);
    if (this.bounds.width === 0) {
      setTimeout(() => this.setBounds(), 100);
    }
  }

  RaiseConflict() {
    if (!this.conflicted) {
      this.blinkConflictedLight();
      this.conflicted = true;
    }
  }

  blinkConflictedLight() {
    this.conflictedOff = !this.conflictedOff;
    if (this.dragging) {
      setTimeout(() => this.blinkConflictedLight(), 412);
    }
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
    e.preventDefault();
    if (e.touches) {
      e = e.touches[0]
    }
    this.lastPoint.x = e.clientX;
    this.lastPoint.y = e.clientY;
    this.dragging = true;
    return false;
  }
  
  dragEnd(e) {
    if (!this.dragging) return;
    this.dragging = false;
    this.setBounds();
    this.service.onDrop(this.dragid, this.bounds);
    this.overValidTarget = false;
  }
  
  handleDrag(e) {
    if (!this.dragging || this.lock) return;
    e.preventDefault();
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
    this.service.HandleMove(this.dragid);
  }
  
  enforceBounds() {
    let maxx = window.innerWidth - this.width;
    let maxy = window.innerHeight - this.height;
    
    if (this.top < 0) this.top = 0;
    if (this.top > maxy) this.top = maxy;
    if (this.left < 0) this.left = 0;
    if (this.left > maxx) this.left = maxx;
    
    this.setBounds();
  }

  

}
