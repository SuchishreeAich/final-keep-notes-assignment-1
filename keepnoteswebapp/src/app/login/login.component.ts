import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();

  submitMessage: string;
  sucessMessage: string;

  constructor(private routerService: RouterService,
    private authenticationService: AuthenticationService) { }

  loginSubmit() {
    const creds = {
      'username': this.username.value,
      'password': this.password.value,
    };

    console.log('loginSubmit', this.username.value);

    if (!this.username.value || !this.password.value) {
      this.submitMessage = 'Username and Password required';
    } else {
      const authenticationResult = this.authenticationService.authenticateUser(creds);
      console.log('loginSubmit 2');
      authenticationResult.subscribe(
        resp => {
          if (resp) {
            this.authenticationService.setBearerToken(resp['token']);
            const userItem = resp['user'];
            const loginID = userItem['userId'];
            const loginName = userItem['userName'];
            this.authenticationService.setLoginID(loginID);
            this.authenticationService.setLoginName(loginName);
            console.log('loginSubmit 3');
            this.routerService.routeToDashboard();

          } else {
            console.log('loginSubmit 4');
            this.submitMessage = 'Unauthorized';
          }
        },
        err => {
          console.log('loginSubmit 5');
          if (err.error) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
        }
      );
    }
  }

  register() {
    this.routerService.routeToRegister();
    this.sucessMessage = 'Registration successful.Please login';
  }
}
