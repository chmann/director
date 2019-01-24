import { Injectable } from '@angular/core';
import { registerContentQuery } from '@angular/core/src/render3';
import { DragdivComponent } from './dragdiv/dragdiv.component';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  registry = [];

  constructor() { }

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
      if (this.inZone(a, this.registry[i].target, 15) && this.registry[i].callback) {
        this.registry[i].callback();
        return true;
      }
    }
    console.log(this.registry);
  }

  //Returns true when the center of a is within 
  //t pixels of b's width of b's center in any direction
  inZone(a: DOMRect, b: DOMRect, t: number) {
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

  addUpdateTarget(id : string, target : DOMRect, callback : Function, dragdiv: DragdivComponent) {
    for (let i = 0; i < this.registry.length; i++) {
      if (this.registry[i].id === id) {
        this.registry[i].target = target;
        if (callback) this.registry[i].callback = callback;
        if (dragdiv) this.registry[i].obj = dragdiv;
        return;
      };
    }
    this.registry.push({id: id, target: target, callback: callback, obj: dragdiv});
  }
}
