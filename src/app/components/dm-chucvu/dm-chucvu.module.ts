import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_ChucVuFormComponent } from './dm-chucvu-form/dm-chucvu-form.component';
import { DM_ChucVuRoutingModule } from './dm-chucvu-routing.module';
import { DM_ChucVuComponent } from './dm-chucvu.component';


@NgModule({
  declarations: [
    DM_ChucVuComponent,
    DM_ChucVuFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_ChucVuRoutingModule
  ],
  exports: [
    DM_ChucVuComponent
  ]
})
export class DM_ChucVuModule { }
