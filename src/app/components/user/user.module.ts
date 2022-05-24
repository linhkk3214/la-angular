import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
