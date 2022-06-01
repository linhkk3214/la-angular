import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { KeyStorageUserInfo, KeySubscribeLogon } from './models/const';
import { ContextService } from './shared/services/context.service';

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
    private _router: Router,
    private _contextService: ContextService
  ) {
  }

  ngOnInit(): void {
    this._contextService.subscribe(KeySubscribeLogon, p => {
      this.checkUserLogon();
    });
    this.checkUserLogon();
  }

  checkUserLogon() {
    const userCurrent = localStorage.getItem(KeyStorageUserInfo);
    if (!userCurrent) {
      this._router.navigate(['login']);
    }
    else {
      this.userVerified = true;
    }
  }

  logout() {
    localStorage.removeItem(KeyStorageUserInfo);
    this.userVerified = false;
    this._router.navigate(['login']);
  }
}
