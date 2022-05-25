import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent implements OnInit {
  constructor(
    private _router: Router
  ) {
    console.log(this._router.url);
  }

  ngOnInit(): void {
    console.log(this._router.url);
  }
}
