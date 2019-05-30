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

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {

    const token = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const getNotesResponse = this.httpClient.get<Array<Note>>(
      `http://localhost:7000/api/v1/notes/?userId=${this.authenticationService.getLoginID()}`,
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

      const getNotesResponse = this.httpClient.get<Array<Note>>(
        `http://localhost:7000/api/v1/notes/searchNotesByTitle/${title}`,
        httpOptions);

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
      (`http://localhost:7000/api/v1/notes/${this.authenticationService.getLoginID()}`,
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
      `http://localhost:7000/api/v1/notes/updateNotes/${note.id}`,
      note, httpOptions);

    return editNoteResponse.pipe(tap(response => {
      this.notes.push(response);
      this.notesSubject.next(this.notes);
    }));
  }


  deleteNote(note: Note): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const deleteNoteResponse = this.httpClient.delete<Note>(
      `http://localhost:7000/api/v1/notes/${note.id}`,
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
      `http://localhost:7000/api/v1/notes/${note.id}/?isFavourite=false`,
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
      `http://localhost:7000/api/v1/notes/${note.id}/?isFavourite=true`,
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
}
