import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThongKe_SinhVienNganh2RoutingModule } from './thongke-sinhviennganh2-routing.module';
import { ThongKe_SinhVienNganh2_XemChiTietComponent } from './thongke-sinhviennganh2-xemchitiet/thongke-sinhviennganh2-xemchitiet.component';
import { ThongKe_SinhVienNganh2Component } from './thongke-sinhviennganh2.component';


@NgModule({
  declarations: [
    ThongKe_SinhVienNganh2Component,
    ThongKe_SinhVienNganh2_XemChiTietComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThongKe_SinhVienNganh2RoutingModule,
  ],
  exports: [
    ThongKe_SinhVienNganh2Component
  ]
})
export class ThongKe_SinhVienNganh2Module { }
