import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedInUser: string;
  constructor(private notesService: NotesService, private authService: AuthenticationService) {
    this.notesService.fetchNotesFromServer();
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoginName();
  }
}
