import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';
import { RouterState } from '@angular/router';
import { timeout } from 'q';
import { Timeouts } from 'selenium-webdriver';
import {ApiService} from './../api.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  animations: [
    trigger('anima_text', [
      state('closed', style({
        color: 'white',
        backgroundColor: '#101010' 
      })),
      state('open', style({
        color: '#101010',
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
        backgroundColor: '#101010' 
      })),
      state('open', style({
        color: '#101010',
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
        color: '#101010',
        backgroundColor: 'white'
      })),
      state('open', style({
        color: 'white',
        backgroundColor: '#101010' 
      })),
      state('bros',style({
        color: '#ffce00',
        backgroundColor: '#E4E7E9' 
      })),
      state('brokey',style({
        color: '#ffce00',
        backgroundColor: 'red !important' 
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
      transition('bros => brokey', [
        animate('1s')
      ]),
      transition('closed => brokey', [
        animate('1s')
      ]),
      transition('open => brokey', [
        animate('1s')
      ]),
      transition('brokey => bros', [
        animate('1s')
      ]),
      transition('brokey => open', [
        animate('1s')
      ]),
      transition('brokey => closed', [
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
  isOpen = true;
  isBrother = true;
  shifted = false;
  triggerd = false;
  triggerDown = false;
  trigger2Down = false;
  triggerStart: any = null;
  times = [];
  count = 0;
  faChessPawn = faChessPawn;
  title0 = 'Hello World';
  title1 = 'Drag & Drop Demo';
  answer = 'c0=C#';//pawn is promoted to Champion for the Checkmate
  hail = '';
  keyInHole = false;
  secretPath = 'bros';

  constructor(private service: ApiService ) { }

  ngOnInit() {
    setTimeout(() => {
      window.scrollTo(0,1);
    }, 1000); 
  }

  handleTouchStart(event) {
    event.keyCode = 16;
    this.handleKeydown(event);
    if (!this.triggerDown) {
      this.triggerDown = true;
      this.handleTrigger(event);
    }
  }

  handleTouchEnd(event) {
    event.keyCode = 16;
    this.handleKeyup(event);
    this.triggerDown = false;
  }

  handleKeydown(event) {
    console.log(event.keyCode);
    if (event.keyCode === 27) {
      this.triggerDown = false;
      this.trigger2Down = false;
      this.isOpen = false;
      this.shifted = false;
      this.resetTrigger();
    }
    if (event.keyCode === 87 && !this.triggerDown) {
      this.triggerDown = true;
      this.handleTrigger(event);
    }
    if (event.keyCode === 86 && !this.triggerDown) {
      this.trigger2Down = true;
      this.handleTrigger2(event);
    }
    if (this.shifted) return;
    if (event.keyCode === 16) {
      this.count++;
      this.isOpen = this.count === 3;
      this.shifted = true;
    }
  }

  handleKeyup(event) {
    if (event.keyCode === 87) {
      this.triggerDown = false;
    }
    if (event.keyCode === 86) {
      this.trigger2Down = false;
    }
    if (event.keyCode === 16) {
      this.shifted = false;
      if (this.count >= 3) {
        this.count = 0;
        this.isOpen = false;
      }
    }
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
        if (res['message']) {
          this.isOpen = true;
          this.isBrother = true;
          this.title1 = res['title']
          this.hail = res['message'];
          this.secretPath = 'bros';
          console.log(res['log']);
          localStorage.setItem('tokeN', res['token']);
          setTimeout(() => {
            this.isBrother = false;
            this.isOpen = false;
            this.title1 = "GAME OVER";
            this.hail = '';
            this.resetTrigger();
          }, 42420);
        }
      });
      this.resetTrigger();
    }
  }

  handleTrigger2(event) {
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
    if (this.times.length === 8) {
      this.service.getToken(this.times, 'authvictory').subscribe(res => {
        if (res['success']) {
          this.isOpen = true;
          this.isBrother = true;
          this.title1 = "VICTORY!!!!";
          this.hail = 'First to the Key...'
          this.secretPath = 'victory';
          console.log(res['log']);
          localStorage.setItem('tokeN', res['token']);
          setTimeout(() => {
            this.isBrother = false;
            this.isOpen = false;
            this.title1 = "GAME OVER";
            this.hail = '';
            this.resetTrigger();
          }, 42420);
        }
      });
    }
  }

  handleKeyDrop() {
    if (this.keyInHole) return;
    this.keyInHole = true;
    setTimeout(() => { this.keyInHole = false; console.log('keyInHole = false');}, 5256);
    console.log('handle keyDrop', this.secretPath);
  }

}
