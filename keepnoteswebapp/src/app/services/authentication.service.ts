import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:7000/api/v1/users/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  removeBearerToken() {
    localStorage.removeItem('bearerToken');
  }


  setLoginID(loginID) {
    localStorage.setItem('loginID', loginID);
  }

  getLoginID() {
    return localStorage.getItem('loginID');
  }

  removeLoginID() {
    localStorage.removeItem('loginID');
  }

  isUserAuthenticated(token): Promise<boolean> {


    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const authResponse = this.httpClient.post('http://localhost:7000/api/v1/auth', {},
    httpOptions).pipe(map(response => response['isAuthenticated']));

    return authResponse.toPromise();

  }
}
