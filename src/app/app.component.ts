import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { KeyStorageUserInfo } from './models/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent implements OnInit {
  showMenu = true;
  showHelp = false;
  userVerified = false;
  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    const userCurrent = localStorage.getItem(KeyStorageUserInfo);
    if (!userCurrent) {
      this._router.navigate(['login']);
    }
    else {
      this.userVerified = true;
    }
  }
}
