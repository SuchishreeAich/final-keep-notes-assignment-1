import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css']
})
export class NoteSearchComponent {

  notes: Array<Note>;
  errMessage: string;
  title: string;

  constructor(private notesService: NotesService) {
    this.errMessage = '';
  }

  onSearch() {
    // console.log('search', this.title);
    if (!this.title) {
      // console.log('search1');
      this.notesService.fetchNotesFromServer();
    } else {
      // console.log('search2');
      this.notesService.fetchNotesByTitle(this.title);
    }
  }

}
