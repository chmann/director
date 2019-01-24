import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http : HttpClient) { }

  buildURL(route, params) {
    return environment.apiUrl + route + params; 
  }

  buildOptions() {
    return {headers: {'Authorization': localStorage.tokeN || ''}};
  }

  getToken(vals :any[]) {
    let params = '';
    vals.forEach(element => {
      params += '/' + element;
    });
    return this.http.get(this.buildURL('/authbros', params),this.buildOptions());
  }

  getContent(path :string) {
    return this.http.get(this.buildURL('/Content/' + path, ''),this.buildOptions());
  }
}
