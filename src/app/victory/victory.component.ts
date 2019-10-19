import { Component, OnInit } from '@angular/core';
import {ApiService} from './../api.service';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../animations';

@Component({
  selector: 'app-victory',
  templateUrl: '../auth/auth.component.html',
  styleUrls: ['../victory/victory.component.scss'],
  animations: [
    fadeInAnimation
  ]
})
export class VictoryComponent implements OnInit {
  valid = false;
  classification = "";
  authMessage = "";
  authNote = "";
  destructTime = 412 * 4 + 339;
  initialized = false;
  footerImage = "";
  authImage = "";
  authImage2 = "";
  authImage3 = "";
  authImage4 = "";
  scrollingText = "";
  overrideMessage = "SOAR";
  overridePulseRate = 1;
  overridePulsing =  false;
  showVideo = true;
  silentCountdown = true;
  timer = 0;
  creedIndex = 0;
  creed = [];
  creedClone = null;
  showAuthImage1 = true;
  showAuthImage2 = false;
  showAuthImage3 = false;
  showAuthImage4 = false;
  videoCode = 'torEytKxkeI';
  altVideoCode = 'pOVrOuKVBuY';//'J5jIpAeYwPo';
  starting = false;
  videoCodes = ['torEytKxkeI'];//,'pOVrOuKVBuY','J5jIpAeYwPo','N9XCBNhw9JE','zemjJhquxH8', 'ZH65WNJ6b4Q', 'LZngavkVeO4', 'Y1UiD2sxoWo'];
  videoIndex = 0;
  selectedVideo = '';

  constructor(private service : ApiService, private router: Router) { }

  ngOnInit() {
    this.service.getContent('victory').subscribe(res => {
      if (!res['success']) {
        this.router.navigate(['/']);
      }
      else {
        this.valid = true;
        this.classification = res['type'];
        if (res["codes"] && res["codes"].length) {
          this.videoCodes = res["codes"];
        }
        let msgs = res['message'].split('|');
        setTimeout(() => {
          this.authMessage = msgs[0];
          this.authNote = msgs[1];
          this.footerImage = '../../assets/img/seal.png';
          this.authImage2 = '../../assets/img/resist.png';
          this.authImage3 = '../../assets/img/phx.png';
          this.authImage4 = '../../assets/img/fcfull.png';
          if (res["creed"]) {
            this.creed = res["creed"].split('\t');
            var el = document.getElementById('star-wars');
            if (el) {
              this.scrollingText = this.creed[0];
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
          }
         
          this.authImage = '../../assets/img/ee.png';
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
        // this.selectedVideo = this.altVideoCode;
        setTimeout(() => this.autoPlayVideo(), 1242);
        
      }
    });
  }  

  toggleAuthImage() {
    if (this.showAuthImage1) {
      this.showAuthImage1 = false;
      this.showAuthImage2 = true;
      this.showAuthImage3 = false;
      this.showAuthImage4 = false;
    }
    else if (this.showAuthImage2) {
      this.showAuthImage1 = false;
      this.showAuthImage2 = false;
      this.showAuthImage3 = true;
      this.showAuthImage4 = false;
    }
    else if (this.showAuthImage3) {
      this.showAuthImage1 = false;
      this.showAuthImage2 = false;
      this.showAuthImage3 = false;
      this.showAuthImage4 = true;
    }
    else if (this.showAuthImage4) {
      this.showAuthImage1 = true;
      this.showAuthImage2 = false;
      this.showAuthImage3 = false;
      this.showAuthImage4 = false;
    }
  }

  autoPlayVideo() {
    let vcode = this.selectedVideo;
    if (this.showVideo) {
      window.blur();
      document.getElementById('videoContainer').innerHTML = '<iframe id="videoiframe" class="videoFrame" style="width: 100%; max-width: 500px; opacity: 0.42" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
    }
    else {
      document.getElementById('videoContainer').innerHTML = '<div></div>';
    }
  }

  startScroll() {
    if (!this.starting) {
      this.starting = true;
      this.selectedVideo = this.videoCodes[this.videoIndex];
      setTimeout (() => {
        var el = document.getElementById('scrolling-text');
        var creedHTML = '';
        for (var i = 0; i < this.creed.length; i++) {
          if (creedHTML.length) {
            creedHTML += '<br/><br/>'
          }
          creedHTML += this.creed[i];
        }
        el.innerHTML = '<div style="height:242px; max-width: 1242px; font-size: 0.6180em; padding: 0 1.6180em; color: gold;">' + creedHTML + '</div>';
        el.setAttribute('aria-label', this.screenReaderText());
        this.showVideo = true;
        this.scrollingText = creedHTML;
        this.autoPlayVideo();
        setTimeout(this.startScrollAnimation, 3142)
        
      }, 208)
    }
    
  }

  startScrollAnimation() {
    var el = document.getElementById('scrolling-text');
    setInterval(() => {if (el.scrollTop < el.scrollHeight - el.clientHeight) el.scrollTop++; else {el.scrollTop = 0}}, 42);
  }

  screenReaderText() {
    var final:string = '';
    var text:string = this.creed.join();
    var escape = false;
    for (var i = 0; i < text.length; i++) {
      if (text[i] === '<') escape = true;
      if (!escape) final += text[i];
      if (text[i] === '>') escape = false;
    }
    return final;
  }

  toggleVideo(skipIncrement:boolean = false) {
    this.showVideo = true;
    if (this.videoIndex === this.videoCodes.length - 1){
      this.videoIndex = 0;
    }
    else if (!skipIncrement) {
      this.videoIndex++;
    }
    this.selectedVideo = this.videoCodes[this.videoIndex];
    this.autoPlayVideo();
  }
}

