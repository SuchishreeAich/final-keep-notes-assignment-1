import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  registerSuccess: boolean;

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.registerSuccess = false;
  }

  registerUser(data) {
    return this.httpClient.post
      (`http://localhost:7000/users/register`,
      data);
  }

  fetchNotesFromServer() {

    const token = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const getNotesResponse = this.httpClient.get<Array<Note>>(
      // tslint:disable-next-line:max-line-length
      `http://localhost:7000/notes/${this.authenticationService.getLoginID()}/${this.authenticationService.getLoginName()}`,
      httpOptions);

    getNotesResponse.subscribe(
      (noteList) => {
        this.notes = noteList;
        this.notesSubject.next(this.notes);
      }
    );
  }


  fetchNotesByTitle(title: string) {

    if (title !== '') {
      const token = this.authenticationService.getBearerToken();
      const httpOptions = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      };

      // tslint:disable-next-line:max-line-length
      const getNotesResponse = this.httpClient.get<Array<Note>>
      (`http://localhost:7000/notes/searchNotesByTitle/${title}`, httpOptions);


      getNotesResponse.subscribe(
        (noteList) => {
          this.notes = noteList;
          this.notesSubject.next(this.notes);
        }
      );
    } else {
      this.fetchNotesFromServer();
    }
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {

    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const addNoteResponse = this.httpClient.post<Note>
      (`http://localhost:7000/notes/${this.authenticationService.getLoginID()}`,
      note,
      httpOptions);

    return addNoteResponse.pipe(tap(response => {
      this.notes.push(response);
      this.notesSubject.next(this.notes);
    }));
  }

  editNote(note: Note): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const editNoteResponse = this.httpClient.put<Note>(
      `http://localhost:7000/notes/updateNotes/${note.id}`,
      note, httpOptions);

    return editNoteResponse.pipe(tap(response => {
      this.notesSubject.next(this.notes);
    }));
  }


  deleteNote(note: Note): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const deleteNoteResponse = this.httpClient.delete<Note>(
      `http://localhost:7000/notes/deleteNote/${note.id}`,
      httpOptions);

    return deleteNoteResponse.pipe(tap(response => {
      this.notes = this.notes.filter(element => element.id !== response.id);
      this.notesSubject.next(this.notes);
    }));
  }


  removeFromFavourite(note: Note): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const removeFromFavResponse = this.httpClient.put<Note>(
      `http://localhost:7000/notes/favourite/${note.id}/?isFavourite=false`,
      {}, httpOptions);

    return removeFromFavResponse.pipe(tap(response => {
      this.notes.forEach(element => {
        if (element.id === response.id) {
          element.isFavourite = response.isFavourite;
        }
      });
      this.notesSubject.next(this.notes);
    }));
  }

  addToFavourite(note: Note): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };
    const addToFavResponse = this.httpClient.put<Note>(
      `http://localhost:7000/notes/favourite/${note.id}/?isFavourite=true`,
      {}, httpOptions);

    return addToFavResponse.pipe(tap(response => {
      this.notes.forEach(element => {
        if (element.id === response.id) {
          element.isFavourite = response.isFavourite;
        }
      });
      this.notesSubject.next(this.notes);
    }));
  }

  getNoteById(noteId): Note {
    return this.notes.find((current) => current.id === noteId);
  }


  addToGroup(note: Note, groupId: string): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };
    const addToGroupResponse = this.httpClient.put<Note>(
      `http://localhost:7000/notes/addNoteToGroup/${note.id}/${groupId}`,
      {}, httpOptions);

    return addToGroupResponse.pipe(tap(response => {
      this.notes.forEach(element => {
        if (element.id === response.id) {
          element.group = response.group;
        }
      });
      this.notesSubject.next(this.notes);
    }));
  }

  shareNotes(note: Note, uselist: Object) {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const shareNotesResponse = this.httpClient.put<Note>(
      `http://localhost:7000/notes/shareNote/${note.id}`,
      uselist, httpOptions);

    return shareNotesResponse.pipe(tap(response => {
      this.notes.forEach(element => {
        if (element.id === response.id) {
          element.sharedUsers = response.sharedUsers;
        }
      });
      this.notesSubject.next(this.notes);
    }));
  }
}
