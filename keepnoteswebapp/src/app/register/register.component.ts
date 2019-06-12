import { NotesService } from './../services/notes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = new FormControl();
  password = new FormControl();
  email = new FormControl();

  submitMessage: string;

  // componentLogin: LoginComponent;

  constructor(private notesService: NotesService,
  private routerService: RouterService) {
  }

  registerSubmit() {

    const creds = {
      'username': this.username.value,
      'password': this.password.value,
      'emailId': this.email.value
    };
    if (!this.username.value || !this.password.value || !this.email.value) {
      this.submitMessage = 'Please fill in the mandatory fields';
    } else {
      const registerResult = this.notesService.registerUser(creds);

      registerResult.subscribe(
        resp => {
          if (resp) {
            this.notesService.registerSuccess = true;
            // this.componentLogin.sucessMessage = 'Registration successful.Please login';
            this.routerService.routeToLogin();
          } else {
            this.notesService.registerSuccess = false;
            // this.componentLogin.sucessMessage = '';
            this.submitMessage = 'Unsuccessful registration';
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

}
