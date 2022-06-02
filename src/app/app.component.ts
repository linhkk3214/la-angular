import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  showMenu = true;
  showHelp = false;
  user: any;
  showContext = false;
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
    document.addEventListener('click', this.checkClickOut);
  }

  ngOnDestroy(): void {
    this._contextService.destroyContext();
    document.removeEventListener('click', this.checkClickOut);
  }

  checkClickOut = evt => {
    if (!this.showContext) return;
    if (!evt.target || !(evt.target as HTMLElement).closest('.user-info')) {
      this.showContext = false;
    }
  };

  checkUserLogon() {
    const userCurrent = localStorage.getItem(KeyStorageUserInfo);
    if (!userCurrent) {
      this._router.navigate(['login']);
    }
    else {
      this.user = JSON.parse(userCurrent);
    }
  }

  showContextMenuUser() {
    this.showContext = true;
  }

  logout() {
    localStorage.removeItem(KeyStorageUserInfo);
    this.user = null;
    this.showContext = false;
    this._router.navigate(['login']);
  }
}
