import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  // itobin() = function (i) {
  //   if (i > 255) return;
  //   var remain = i;
  //   var bin = [0,0,0,0,0,0,0,0];
  //   while (remain > 0) {
  //     if (remain > 127) {
  //       bin[0] = 1;
  //       remain -= 128;
  //     }
  //     if (remain > 63) {
  //       bin[1] = 1;
  //       remain -= 64;
  //     }
  //     if (remain > 31) {
  //       bin[2] = 1;
  //       remain -= 32;
  //     }
  //     if (remain > 15) {
  //       bin[3] = 1;
  //       remain -= 16;
  //     }
  //     if (remain > 7) {
  //       bin[4] = 1;
  //       remain -= 8;
  //     }
  //     if (remain > 3) {
  //       bin[5] = 1;
  //       remain -= 4;
  //     }
  //     if (remain > 1) {
  //       bin[6] = 1;
  //       remain -= 2;
  //     }
  //     if (remain > 0) {
  //       bin[7] = 1;
  //       remain -= 1;
  //     }
  //   }
	//   return bin.join().replace(/,/g,'');
  // }