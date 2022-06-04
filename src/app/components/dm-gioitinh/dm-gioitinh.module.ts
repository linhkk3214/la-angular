import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_GioiTinhFormComponent } from './dm-gioitinh-form/dm-gioitinh-form.component';
import { DM_GioiTinhRoutingModule } from './dm-gioitinh-routing.module';
import { DM_GioiTinhComponent } from './dm-gioitinh.component';


@NgModule({
  declarations: [
    DM_GioiTinhComponent,
    DM_GioiTinhFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_GioiTinhRoutingModule
  ],
  exports: [
    DM_GioiTinhComponent
  ]
})
export class DM_GioiTinhModule { }
