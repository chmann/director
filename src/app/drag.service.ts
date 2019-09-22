import { Injectable } from '@angular/core';
import { DragComponent } from './drag/drag.component';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  registry = [];

  constructor() { }

  GetById(id : string) {
    for (let i = 0; i < this.registry.length; i++) {
      if (this.registry[i].id === id) {
        return this.registry[i];
      };
    }
    return null;
  }

  //Update the bounds for all other items in registry
  updateTargetsFor(id: string) {
    for (let i = 0; i < this.registry.length; i++) {
      if (this.registry[i].id === id) continue;
      this.registry[i].obj.setBounds();
    }
  }

  //Calls the callback for the first registry item who's target is inZone
  onDrop(id: string, a: DOMRect) {
    this.updateTargetsFor(id);
    for (let i = 0; i < this.registry.length; i++) {
      if (this.registry[i].id === id) continue;
      if (this.inZone(a, this.registry[i].target, 15)) {
        this.registry[i].callback && this.registry[i].callback();
        return true;
      }
    }
    console.log(this.registry);
  }

  //Returns true when the center of a is within 
  //t pixels of b's width of b's center in any direction
  inZone(a: DOMRect, b: DOMRect, t: number) {
    //Find center x and y points for a and b and check they are witin t pixels of each other
    let acx = a.x + a.width / 2;
    let acy = a.y + a.height / 2;
    let bcx = b.x + b.width / 2;
    let bcy = b.y + b.height / 2;
    if (acx >= bcx - t && acx <= bcx + t &&
        acy >= bcy - t && acy <= bcy + t) {
          return true;
    }
    return false;
  }

  //Returns true when any of the four corners of a DOMRect are within the bounds of b DOMRect
  touches(a: DOMRect, b:DOMRect) {
    let topleft = a.x >= b.x && a.x <= b.x + b.width && a.y >= b.y && a.y <= b.y + b.height;
    let topright = a.x + a.width >= b.x && a.x + a.width <= b.x + b.width && a.y >= b.y && a.y <= b.y + b.height;
    let botleft = a.x >= b.x && a.x <= b.x + b.width && a.y + a.height >= b.y && a.y + a.height <= b.y + b.height;
    let botright = a.x + a.width >= b.x && a.x + a.width <= b.x + b.width && a.y + a.height >= b.y && a.y + a.height <= b.y + b.height;

    return topleft || topright || botleft || botright;
  }

  HandleMove(id : string) {
    let moving = this.GetById(id);
    let conflicted = null;
    for (let i = 0; i < this.registry.length; i++) {
      let current = this.registry[i];
      if (current.id === id) continue;
      let theyTouch = this.touches(moving.target, current.target);
      if (theyTouch && current.obj.preventDrop) {
        conflicted = current;
      }
      
      if (theyTouch && this.inZone(moving.target, current.target, 15)) {
        moving.obj.conflicted = false;
        moving.obj.overValidTarget = true;
        return;
      }
    }
    moving.obj.overValidTarget = false;
    if (conflicted) {
      moving.obj.RaiseConflict();
    }
    else {
      moving.obj.conflicted = false;
    }
  }

  Update(id : string, target : DOMRect, callback : Function, drag: DragComponent) {
    for (let i = 0; i < this.registry.length; i++) {
      if (this.registry[i].id === id) {
        this.registry[i].target = target;
        if (callback) this.registry[i].callback = callback;
        if (drag) this.registry[i].obj = drag;
        return;
      };
    }
    this.registry.push({id: id, target: target, callback: callback, obj: drag});
  }
  
}

