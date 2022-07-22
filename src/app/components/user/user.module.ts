import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    UserComponent,
    UserFormComponent
  ]
})
export class UserWithoutRouteModule { }

@NgModule({
  declarations: [
  ],
  imports: [
    UserWithoutRouteModule,
    UserRoutingModule
  ],
  exports: [
  ]
})
export class UserModule { }
