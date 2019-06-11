import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:7000/users/login', data);
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

  setLoginName(loginName) {
    localStorage.setItem('loginName', loginName);
  }

  getLoginName() {
    return localStorage.getItem('loginName');
  }

  removeLoginName() {
    localStorage.removeItem('loginName');
  }

  isUserAuthenticated(token): Promise<boolean> {

    console.log('token in isuserAuth : ', token);
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const authResponse = this.httpClient.post('http://localhost:7000/auth/', {},
      httpOptions).pipe(map(response => {
        console.log('isAuthenticated response :', response['isAuthenticated']);
        return response['isAuthenticated'];
      }));

    return authResponse.toPromise();

  }

  getAllRegisteredUsers() {

    return this.httpClient.get<Array<Object>>(`http://localhost:7000/users/`)
      .pipe(map(response => response.filter(user => user['userId'] !== this.getLoginID())
        .map(user => user['username'])
      ));
  }

  userLogout() {
    this.removeBearerToken();
    this.removeLoginID();
    this.removeLoginName();
  }
}
