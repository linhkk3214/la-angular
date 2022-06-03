import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_DoiTuongTuyenSinhFormComponent } from './dm-doituongtuyensinh-form/dm-doituongtuyensinh-form.component';
import { DM_DoiTuongTuyenSinhRoutingModule } from './dm-doituongtuyensinh-routing.module';
import { DM_DoiTuongTuyenSinhComponent } from './dm-doituongtuyensinh.component';


@NgModule({
  declarations: [
    DM_DoiTuongTuyenSinhComponent,
    DM_DoiTuongTuyenSinhFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_DoiTuongTuyenSinhRoutingModule
  ],
  exports: [
    DM_DoiTuongTuyenSinhComponent
  ]
})
export class DM_DoiTuongTuyenSinhModule { }
