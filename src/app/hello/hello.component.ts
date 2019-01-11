import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';
import { RouterState } from '@angular/router';
import { timeout } from 'q';
import { Timeouts } from 'selenium-webdriver';
import {ApiService} from './../api.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  animations: [
    trigger('anima_text', [
      state('closed', style({
        color: 'white',
        backgroundColor: 'black' 
      })),
      state('open', style({
        color: 'black',
        backgroundColor: 'white'
      })),
      transition('closed => open', [
        animate('1s')
      ]),
      transition('open => closed', [
        animate('0.5s')
      ]),
    ]),
    trigger('anima_boxTop', [
      state('closed', style({
        color: 'white',
        backgroundColor: 'black' 
      })),
      state('open', style({
        color: 'black',
        backgroundColor: 'white'
      })),
      transition('closed => open', [
        animate('1s')
      ]),
      transition('open => closed', [
        animate('0.5s')
      ]),
    ]),
    trigger('anima_boxBottom', [
      state('closed', style({
        color: 'black',
        backgroundColor: 'white'
      })),
      state('open', style({
        color: 'white',
        backgroundColor: 'black' 
      })),
      state('bros',style({
        color: '#ffce00',
        backgroundColor: '#091833' 
      })),
      transition('closed => open', [
        animate('1s')
      ]),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => bros', [
        animate('1s')
      ]),
      transition('open => bros', [
        animate('1s')
      ]),
      transition('bros => closed', [
        animate('1s')
      ]),
      transition('bros => open', [
        animate('1s')
      ]),
    ]),
    trigger('chessPiece', [
      state('closed', style({
        color: 'white',
        transform: 'scale(1)'
      })),
      state('open', style({
        color: 'transparent',
        transform: 'scale(0.6180)'
      })),
      transition('closed => open', [
        animate('1s')
      ]),
      transition('open => closed', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class HelloComponent implements OnInit {
  isOpen = false;
  isBrother = false;
  shifted = false;
  triggerd = false;
  triggerDown = false;
  triggerStart: any = null;
  times = [];
  count = 0;
  faChessPawn = faChessPawn;
  title0 = 'Hello World';
  title1 = 'GAME OVER';
  answer = 'c9=F#';
  hail = 'Hail Thee Brother!';

  constructor(private service: ApiService ) { }

  ngOnInit() {
  }

  handleMouseDown(event) {
    event.keyCode = 16;
    this.handleKeydown(event);
    if (!this.triggerDown) {
      this.triggerDown = true;
      this.handleTrigger(event);
    }
  }

  handleMouseUp(event) {
    event.keyCode = 16;
    this.handleKeyup(event);
    this.triggerDown = false;
  }

  handleKeydown(event) {
    if (event.keyCode === 87 && !this.triggerDown) {
      this.triggerDown = true;
      this.handleTrigger(event);
    }
    if (this.shifted) return;
    if (event.keyCode === 16) {
      this.count++;
      this.isOpen = this.count === 3;
      this.shifted = true;
    }
    console.log("Kount:",this.count);
  }

  resetTrigger() {
    this.times = [];
    this.triggerStart = null;
  }

  handleTrigger(event) {
    let now: any = new Date();
    if (this.times.length === 0 && this.triggerStart === null) {
      this.triggerStart = now;
      return;
    }
    this.times.push(now - this.triggerStart);
    this.triggerStart = now;
    if (this.times[this.times.length - 1] > 6180) {
      this.resetTrigger();
      return;
    }
    if (this.times.length === 4) {
        this.service.getToken(this.times).subscribe(res => {
        console.log('RESPONSE:', res);
        if (res['message'].length > 0) {
          this.isOpen = true;
          this.isBrother = true;
          this.title1 = res['title']
          this.hail = res['message'];
          console.log(res['log']);
          setTimeout(() => {
            this.isBrother = false;
            this.isOpen = false;
            this.title1 = "GAME OVER";
            this.hail = '';
            this.resetTrigger();
          }, 12420);
        }
      });;
      this.resetTrigger();
    }
  }

  handleKeyup(event) {
    if (event.keyCode === 87) {
      this.triggerDown = false;
    }
    if (event.keyCode === 16) {
      this.shifted = false;
      if (this.count >= 3) {
        this.count = 0;
        this.isOpen = false;
      }
    }
  }

}
