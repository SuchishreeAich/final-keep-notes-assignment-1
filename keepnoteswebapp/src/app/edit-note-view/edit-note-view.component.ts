import { FormControl } from '@angular/forms';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  favButtonText: string;

  constructor(private notesService: NotesService,
    private matDialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    const noteId = this.data['noteId'];
    this.note = this.notesService.getNoteById(noteId);
    this.favButtonText = 'Add to Favourite';
    if (this.note.isFavourite === true) {
      this.favButtonText = 'Remove From Favourite';
    }
  }

  onSave() {

    const editNoteResponse = this.notesService.editNote(this.note);

    editNoteResponse.subscribe(
      (response) => {
        this.matDialogRef.close();
      },
      (err) => {
        if (err.error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = err.message;
        }
      }
    );

  }

  onDelete() {

    const deleteNoteResponse = this.notesService.deleteNote(this.note);

    deleteNoteResponse.subscribe(
      (response) => {
        this.matDialogRef.close();
      },
      (err) => {
        if (err.error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = err.message;
        }
      }
    );
  }

  removeFromFavourite() {
    const removeFavResponse = this.notesService.removeFromFavourite(this.note);

    removeFavResponse.subscribe(
      (response) => {
        this.matDialogRef.close();
      },
      (err) => {
        if (err.error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = err.message;
        }
      }
    );
  }

  addToFavourite() {

    const addFavResponse = this.notesService.addToFavourite(this.note);

    addFavResponse.subscribe(
      (response) => {
        this.matDialogRef.close();
      },
      (err) => {
        if (err.error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = err.message;
        }
      }
    );
  }


  addToGroup() {
    const addGroupResponse = this.notesService.addToGroup(this.note, this.note.group);

    addGroupResponse.subscribe(
      (response) => {
        this.matDialogRef.close();
      },
      (err) => {
        if (err.error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = err.message;
        }
      }
    );
  }

  cancel() {
    this.matDialogRef.close();
  }


}
