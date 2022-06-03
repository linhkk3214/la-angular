import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_TrangThaiNguoiHocFormComponent } from './dm-trangthainguoihoc-form/dm-trangthainguoihoc-form.component';
import { DM_TrangThaiNguoiHocRoutingModule } from './dm-trangthainguoihoc-routing.module';
import { DM_TrangThaiNguoiHocComponent } from './dm-trangthainguoihoc.component';


@NgModule({
  declarations: [
    DM_TrangThaiNguoiHocComponent,
    DM_TrangThaiNguoiHocFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_TrangThaiNguoiHocRoutingModule
  ],
  exports: [
    DM_TrangThaiNguoiHocComponent
  ]
})
export class DM_TrangThaiNguoiHocModule { }
