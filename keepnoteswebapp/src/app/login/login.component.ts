import { Component, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnChanges {
  username = new FormControl();
  password = new FormControl();

  submitMessage: string;
  sucessMessage: string;

  constructor(private routerService: RouterService,
    private authenticationService: AuthenticationService, private noteService: NotesService) { }

  ngOnChanges() {
   // console.log('register success', this.noteService.registerSuccess);
  }

  loginSubmit() {
    const creds = {
      'username': this.username.value,
      'password': this.password.value,
    };


    if (!this.username.value || !this.password.value) {
      this.submitMessage = 'Username and Password required';
    } else {
      const authenticationResult = this.authenticationService.authenticateUser(creds);
      authenticationResult.subscribe(
        resp => {
          if (resp) {
            this.authenticationService.setBearerToken(resp['token']);
            const userItem = resp['user'];
            const loginID = userItem['userId'];
            const loginName = userItem['userName'];
            this.authenticationService.setLoginID(loginID);
            this.authenticationService.setLoginName(loginName);
            this.routerService.routeToDashboard();

          } else {
            this.submitMessage = 'Unauthorized';
          }
        },
        err => {
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
