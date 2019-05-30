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

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {

    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const addNoteResponse = this.httpClient.post<Note>('http://localhost:7000/api/v1/notes', note,
    httpOptions);

    return addNoteResponse.pipe(tap(response => {
      const addedNote = response['note'];
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }));
  }

  editNote(note: Note): Observable<Note> {
    const bearerToken = this.authenticationService.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    };

    const editNoteResponse = this.httpClient.put<Note>(`http://localhost:7000/api/v1/notes/${note.id}`,
    note, httpOptions);

    return editNoteResponse.pipe(tap(response => {
      const updatedNote = response['note'];
      this.notes.push(updatedNote);
      this.notesSubject.next(this.notes);
    }));
  }

  getNoteById(noteId): Note {
    return this.notes.find((current) => current.id === noteId);
  }
}
