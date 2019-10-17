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
  authImage2 = "";
  authImage3 = "";
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
  showAuthImage1 = true;
  showAuthImage2 = false;
  showAuthImage3 = false;
  videoCode = '6A2V9Bu80J4';
  altVideoCode = 'J5jIpAeYwPo';
  selectedVideo = this.videoCode;

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
                  }, 118);
                }
              }, 1000);
            }
            else {
              el = document.getElementById('scrolling-text');
              var creedHTML = '';
              for (var i = 0; i < this.creed.length; i++) {
                if (creedHTML.length) {
                  creedHTML += '<br/><br/>'
                }
                creedHTML += this.creed[i];
              }
              el.innerHTML = creedHTML;
            }
            
          }
          this.authImage = '../../assets/img/learning.png';
          this.authImage2 = '../../assets/img/resist.png';
          this.authImage3 = '../../assets/img/phx.png';
          this.initialized = true;
        }, 1000);

        if (this.destructTime > 0) {
          setInterval(() => this.destructTime--, 1000);
          setTimeout(() => {
            delete localStorage.tokeN;
            clearInterval();
            this.router.navigate(['/']);
          }, this.destructTime * 1000);
        }

        if (this.overrideMessage && this.overridePulseRate) {
          setInterval(() => {
            this.overridePulsing = !this.overridePulsing;
          }, 1000 * this.overridePulseRate);
        }
        this.selectedVideo = this.altVideoCode;
        setTimeout(() => this.toggleVideo(), 1242);
        
      }
    });
  } 
  
  toggleAuthImage() {
    if (this.showAuthImage1) {
      this.showAuthImage1 = false;
      this.showAuthImage2 = true;
      this.showAuthImage3 = false;
    }
    else if (this.showAuthImage2) {
      this.showAuthImage1 = false;
      this.showAuthImage2 = false;
      this.showAuthImage3 = true;
    }
    else if (this.showAuthImage3) {
      this.showAuthImage1 = true;
      this.showAuthImage2 = false;
      this.showAuthImage3 = false;
    }
  }

  startScroll() {
    
  }

  autoPlayVideo() {
    let vcode = this.selectedVideo;

    if (this.showVideo) {
      window.blur();
      document.getElementById('videoContainer').innerHTML = '<iframe id="videoiframe" class="videoFrame" style="width: 100%; max-width: 500px; opacity: 0.42" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>';
    }
    else {
      document.getElementById('videoContainer').innerHTML = '<div></div>';
    }
  }

  toggleVideo() {
    this.showVideo = true;
    if (this.selectedVideo == this.videoCode) {
      this.selectedVideo = this.altVideoCode;
    }
    else {
      this.selectedVideo = this.videoCode;
    }
    this.autoPlayVideo();
    console.log('did it');
  }
}
