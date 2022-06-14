import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachLoaiQuyetDinhFormComponent } from './danhsachloaiquyetdinh-form/danhsachloaiquyetdinh-form.component';
import { DanhSachLoaiQuyetDinhRoutingModule } from './danhsachloaiquyetdinh-routing.module';
import { DanhSachLoaiQuyetDinhComponent } from './danhsachloaiquyetdinh.component';


@NgModule({
  declarations: [
    DanhSachLoaiQuyetDinhComponent,
    DanhSachLoaiQuyetDinhFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhSachLoaiQuyetDinhRoutingModule
  ],
  exports: [
    DanhSachLoaiQuyetDinhComponent
  ]
})
export class DanhSachLoaiQuyetDinhModule { }
