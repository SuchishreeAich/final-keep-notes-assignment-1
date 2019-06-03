import { RouterService } from './../services/router.service';
import { ReminderService } from './../services/reminder.service';
import { SocketService } from './../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public snackBar: MatSnackBar;

  constructor(private matSnackBar: MatSnackBar,
    private socketSvc: SocketService,
    private routerSvc: RouterService,
    private reminderSvc: ReminderService) {
    this.snackBar = matSnackBar;
  }

  ngOnInit() {

    setTimeout(() => {
      this.enableNotifications();
      this.enableRemindersWithSnooze();
    });

  }

  enableNotifications() {

    this.socketSvc.getNotificationSubject().subscribe(
      notification => {

        if (notification) {
          // Open notification alert -- changed to snackbar
          this.snackBar.open(notification, 'Done', {
            duration: 3000 // Close snackbar
          });
        }

      }, error => {
      }
    );

  }

  enableRemindersWithSnooze() {

    this.socketSvc.getReminderSubject().subscribe(
      reminder => {

        if (reminder) {
          // Open reminder alert -- changed to snackbar + Snooze
          const snoozeSnackBar = this.snackBar.open(reminder, 'Snooze');
          snoozeSnackBar.onAction().subscribe(() => this.setSnoozeReminder());
        }

      }, error => {
      }
    );

  }

  setSnoozeReminder() {
    this.reminderSvc.snoozeReminder(this.socketSvc.getNotificationId(), 20)
      .subscribe(
      response => {
        // Open snooze alert -- changed to snackbar
        this.snackBar.open(`Reminder snooze for 20 seconds`, 'Done', {
          duration: 3000 // Close snackbar
        });
      }, error => {
      }
      );
  }


}
