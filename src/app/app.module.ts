import { DatePipe, DecimalPipe } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './components/user/user.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastModule,
    ConfirmDialogModule,
    NgxMaskModule.forRoot(),
    UserModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'vi-VN' },
    DatePipe,
    DecimalPipe,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
