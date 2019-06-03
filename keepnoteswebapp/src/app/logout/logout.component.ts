import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routerService: RouterService,
    private authenticationService: AuthenticationService,
    private socketService: SocketService) { }

  ngOnInit() {

    setTimeout(() => {

      const resp = {
        status: 200,
        message: 'Logout successfull.'
      } ;
      this.socketService.enableNotification(resp);
      this.authenticationService.userLogout();
      this.socketService.disconnect();
      this.routerService.routeToLogin();
    }, 1000);


  }

}
