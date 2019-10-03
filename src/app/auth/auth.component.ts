import { Component, OnInit } from '@angular/core';
import {ApiService} from './../api.service';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../animations';
import { element } from 'protractor';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'], 
  animations: [
    fadeInAnimation
  ]
})
export class AuthComponent implements OnInit {
  valid = false;
  classification = "";
  authMessage = "";
  authNote = "";
  destructTime = 60 * 5;
  initialized = false;
  footerImage = "";
  authImage = "";
  scrollingText = "";
  overrideMessage = "GO";
  overridePulseRate = 1;
  overridePulsing =  false;
  showVideo = false;
  silentCountdown = true;
  timer = 0;
  creedIndex = 0;
  creed = [];
  creedClone = null;

  constructor(private service : ApiService, private router: Router) { }

  ngOnInit() {
    this.service.getContent('bros').subscribe(res => {
      if (!res['success']) {
        this.router.navigate(['/']);
      }
      else {
        this.valid = true;
        this.classification = res['type'];
        let msgs = res['message'].split('|');
        setTimeout(() => {
          this.authMessage = msgs[0];
          this.authNote = msgs[1];
          this.footerImage = '../../assets/img/seal.png';
          if (res["creed"]) {
            this.creed = res["creed"].split('\t');
            this.scrollingText = this.creed[0];
            var el = document.getElementById('star-wars');
            if (el) {
              this.creedClone = el.cloneNode(true);
            }
            setInterval(() => {
              this.timer++;
              if (this.timer > 36) {
                this.timer = 0;
                var temp = this.scrollingText;
                if (this.creedIndex >= this.creed.length) {
                  this.creedIndex = 0;
                }
                this.scrollingText = this.creed[this.creedIndex++];
                el = document.getElementById('star-wars');
                console.log('here we are');
                setTimeout(() => {
                  el.style.animation = 'none';
                  el.offsetHeight; /* trigger reflow */
                  el.style.animation = null; 
                  // //Hack see: https://css-tricks.com/restart-css-animation/
                  // el.classList.remove("crawl");
                  // void el.offsetWidth;
                  // el.classList.add("crawl");
                  // el.before(el.cloneNode(true));
                  // el.className += " active";
                  //setTimeout(() => el.className.replace(" active", ""), 118);
                  
                }, 118);
              }
            }, 1000);
          }
          this.authImage = '../../assets/img/learning.png';
          this.initialized = true;
        }, 1000);

        if (this.destructTime > 0) {
          setInterval(() => this.destructTime--, 1000);
          setTimeout(() => {
            delete localStorage.tokeN;
            this.router.navigate(['/']);
          }, this.destructTime * 1000);
        }

        if (this.overrideMessage && this.overridePulseRate) {
          setInterval(() => {
            this.overridePulsing = !this.overridePulsing;
          }, 1000 * this.overridePulseRate);
        }
        setTimeout(() => this.toggleVideo(), 1242);
        
      }
    });
  }  

  autoPlayVideo() {
    let vcode = 'J5jIpAeYwPo';

    if (this.showVideo) {
      window.blur();
      document.getElementById('videoContainer').innerHTML = '<iframe id="videoiframe" class="videoFrame" style="width: 100%; max-width: 500px; opacity: 0.42" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>';
    }
    else {
      document.getElementById('videoContainer').innerHTML = '<div></div>';
    }
  }

  toggleVideo() {
    this.showVideo = !this.showVideo;
    this.autoPlayVideo();
    console.log('did it');
  }
}
