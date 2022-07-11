import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HoSoNguoiHocWithoutRouteModule } from '../hosonguoihoc/hosonguoihoc.module';
import { ThongKe_NhapHocRoutingModule } from './thongke-nhaphoc-routing.module';
import { ThongKe_NhapHoc_XemChiTietComponent } from './thongke-nhaphoc-xemchitiet/thongke-nhaphoc-xemchitiet.component';
import { ThongKe_NhapHocComponent } from './thongke-nhaphoc.component';


@NgModule({
  declarations: [
    ThongKe_NhapHocComponent,
    ThongKe_NhapHoc_XemChiTietComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThongKe_NhapHocRoutingModule,
    HoSoNguoiHocWithoutRouteModule
  ],
  exports: [
    ThongKe_NhapHocComponent
  ]
})
export class ThongKe_NhapHocModule { }
