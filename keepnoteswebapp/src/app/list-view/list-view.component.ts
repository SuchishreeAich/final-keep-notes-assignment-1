import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  notesPresent: boolean;

  constructor(private notesService: NotesService) {
    this.notesPresent = false;
    const getNotesResponse = this.notesService.getNotes();
    getNotesResponse.subscribe(
      (response) => {
        if (response.length > 0) {
          this.notesPresent = true;
        } else {
          this.notesPresent = false;
        }
        this.notStartedNotes = response.filter((note) => 'not-started' === note.state);
        this.startedNotes = response.filter((note) => 'started' === note.state);
        this.completedNotes = response.filter((note) => 'completed' === note.state);
      }
    );
  }

}
