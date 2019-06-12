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
    const getNotesResponse = this.notesService.getNotes();
    getNotesResponse.subscribe(
      (response) => {
        this.notes = response;
        if (this.notes.length > 0) {
          this.notesPresent = true;
        } else {
          this.notesPresent = false;
        }
      },
      (error) => this.errMessage = error.message
    );
  }
}
