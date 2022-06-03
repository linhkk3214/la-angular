import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_HocLucFormComponent } from './dm-hocluc-form/dm-hocluc-form.component';
import { DM_HocLucRoutingModule } from './dm-hocluc-routing.module';
import { DM_HocLucComponent } from './dm-hocluc.component';


@NgModule({
  declarations: [
    DM_HocLucComponent,
    DM_HocLucFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_HocLucRoutingModule
  ],
  exports: [
    DM_HocLucComponent
  ]
})
export class DM_HocLucModule { }
