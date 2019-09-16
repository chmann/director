import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  GUID() {
    let g = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (g()+g()+'-'+g()+'-'+g()+'-'+g()+'-'+g()+g()+g());
  }
}
