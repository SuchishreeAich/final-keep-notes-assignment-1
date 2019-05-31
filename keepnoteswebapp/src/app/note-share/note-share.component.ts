import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { element } from 'protractor';

@Component({
  selector: 'app-note-share',
  templateUrl: './note-share.component.html',
  styleUrls: ['./note-share.component.css']
})
export class NoteShareComponent implements OnInit {
  @Input() note: Note;
  errMessage: string;
  sharedUsers: Array<string>;
  selectedUser: Array<string>;
  constructor(private notesService: NotesService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getAllRegisteredUsers().subscribe(response => {
      const noteSharedUsers = this.note.sharedUsers;

      this.sharedUsers = response.filter(e => !noteSharedUsers.find(e1 => e1 === e));

    }, error => {
    });
  }

  shareNotes() {
    const shareUserList = {
      'sharedUsers': this.selectedUser
    };

    const shareNotesResponse = this.notesService.shareNotes(this.note, shareUserList);

    shareNotesResponse.subscribe(
      (response) => { },
      (err) => {
        if (err.error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = err.message;
        }
      }
    );
  }


}
