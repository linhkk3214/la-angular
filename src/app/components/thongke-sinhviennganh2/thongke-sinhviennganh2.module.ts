import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HoSoNguoiHocWithoutRouteModule } from '../hosonguoihoc/hosonguoihoc.module';
import { ThongKe_SinhVienNganh2RoutingModule } from './thongke-sinhviennganh2-routing.module';
import { ThongKe_SinhVienNganh2Component } from './thongke-sinhviennganh2.component';


@NgModule({
  declarations: [
    ThongKe_SinhVienNganh2Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThongKe_SinhVienNganh2RoutingModule,
    HoSoNguoiHocWithoutRouteModule
  ],
  exports: [
    ThongKe_SinhVienNganh2Component
  ]
})
export class ThongKe_SinhVienNganh2Module { }
