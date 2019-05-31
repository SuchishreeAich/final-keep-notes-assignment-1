import { Injectable } from '@angular/core';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  reminders: Array<any>;
  remindersSubject: BehaviorSubject<Array<any>>;
  userId: string;

  constructor(private httpClient: HttpClient, private authSvc: AuthenticationService) {
    this.reminders = [];
    this.remindersSubject = new BehaviorSubject(this.reminders);
    this.userId = this.authSvc.getLoginID();

      this.fetchAllRemindersFromServer();
  }

  getAuthHeader() {
    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    return httpOptions;
  }

  fetchAllRemindersFromServer() {
    const reminderObserver = this.httpClient.get<Array<any>>
    (`http://localhost:7000/notifications/reminders?userId=${this.userId}`,
    this.getAuthHeader());

    reminderObserver.subscribe(response => {
      this.reminders = response;
      this.remindersSubject.next(this.reminders);
    }, error => console.log('Error in fetchAllRemindersFromServer.', error));

  }

  getReminderSubject(): BehaviorSubject<Array<any>> {
    return this.remindersSubject;
  }

  shareNoteWithReminderAt(notes: Note[], selectedUsers: string[], edittype: string): Observable<string> {

    const reminder = {
      remindAt: new Date(), // Sending reminder with current time
      notes: notes,
      userName: selectedUsers[0],
      self : false,
      edittype: edittype
    };

    const reminderObserver = this.httpClient.post<any>
    (`http://localhost:7000/notifications/?userId=${this.userId}`,
    reminder, this.getAuthHeader());

    return reminderObserver.pipe(tap(response => {
      this.reminders.push(response.notification);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in setReminderAt.', error)
    ));
  }

  setReminderAt(remindAt: Date, note: Note): Observable<string> {

    const reminder = {
      remindAt: remindAt,
      note: note,
      userName: this.authSvc.getLoginID()
    };

    const reminderObserver = this.httpClient.post<any>
    (`http://localhost:7000/notifications/reminders?userId=${this.userId}`,
    reminder, this.getAuthHeader());

    return reminderObserver.pipe(tap(response => {
      this.reminders.push(response.notification);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in setReminderAt.', error)
    ));
  }

  snoozeReminder(reminderID: string, snoozeMinutes: number): Observable<any> {

    if (this.reminders.length === 0) {
      this.fetchAllRemindersFromServer();
    }
    const reminder = this.reminders.find(remindertemp => remindertemp.notificationID === reminderID);

    const dateRemindAt = new Date(reminder.remindAt);
    dateRemindAt.setMinutes(dateRemindAt.getMinutes() + snoozeMinutes);

    reminder.remindAt = dateRemindAt;

    const reminderObserver = this.httpClient.put<any>
    (`http://localhost:7000/notifications/reminders/${reminderID}?userId=${this.userId}`,
    reminder, this.getAuthHeader());
    return reminderObserver.pipe(tap(response => {

      this.reminders = this.reminders.filter(remindertemp => remindertemp.notificationID !== reminderID);

      this.reminders.push(response);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in snoozeReminder.', error)
    ));
  }

  dismissReminder(reminderID: string) {

    if (this.reminders.length === 0) {
      this.fetchAllRemindersFromServer();
    }
    const reminder = this.reminders.find(remindertemp => remindertemp.notificationID === reminderID);

    const reminderObserver = this.httpClient.delete<any>
    (`http://localhost:7000/notifications/reminders/${reminder.notificationID}?userId=${this.userId}`,
    this.getAuthHeader());

    return reminderObserver.pipe(tap(response => {

      this.reminders = this.reminders.filter(remindertemp => remindertemp.notificationID !== reminderID);

      this.reminders.push(response);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in snoozeReminder.', error)
    ));

  }

  getNotificationIDForNote(note: Note) {

    const reminderIDs = [];

    this.reminders.forEach(reminder => {
      const reminderNote = reminder.note;

      if (reminderNote && reminderNote.title === note.title
        && reminderNote.text === note.text) {
        reminderIDs.push(reminder.notificationID);
      }
    });

    return reminderIDs;

  }
}
