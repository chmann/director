import { Component, OnInit } from '@angular/core';
import {ApiService} from './../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  valid = false;
  classification = "";
  authMessage = "";
  authNote = "";
  destructTime = 30;

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
        this.authMessage = msgs[0];
        this.authNote = msgs[1];
        setInterval(() => {
          if (this.destructTime > 0)
            this.destructTime--;
        }, 1000);
        setTimeout(() => {
          delete localStorage.tokeN;
          this.router.navigate(['/']);
        }, this.destructTime * 1000);
      }
    });
  }

}
