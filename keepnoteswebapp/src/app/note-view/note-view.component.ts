import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note>;
  errMessage: string;
  notesPresent: boolean;

  constructor(private notesService: NotesService, private authService: AuthenticationService) {
    this.errMessage = '';
    this.notesPresent = false;
  }

  ngOnInit() {
    // console.log('User', this.authService.getLoginName());
    const getNotesResponse = this.notesService.getNotes();
    getNotesResponse.subscribe(
      (response) => {
        this.notes = response;
       // console.log('Notes 1 for user', this.authService.getLoginName());
       // console.log('Notes 2 for user', this.notes);
        if (this.notes.length > 0) {
          this.notesPresent = true;
        } else {
          this.notesPresent = false;
        }
       // console.log('Notes 3 for user', this.notesPresent);
      },
      (error) => this.errMessage = error.message
    );
  }
}
