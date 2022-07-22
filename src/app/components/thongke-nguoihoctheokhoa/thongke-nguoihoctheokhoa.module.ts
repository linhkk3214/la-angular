import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HoSoNguoiHocWithoutRouteModule } from '../hosonguoihoc/hosonguoihoc.module';
import { ThongKe_NguoiHocTheoKhoaRoutingModule } from './thongke-nguoihoctheokhoa-routing.module';
import { ThongKe_NguoiHocTheoKhoaComponent } from './thongke-nguoihoctheokhoa.component';


@NgModule({
  declarations: [
    ThongKe_NguoiHocTheoKhoaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThongKe_NguoiHocTheoKhoaRoutingModule,
    HoSoNguoiHocWithoutRouteModule
  ],
  exports: [
    ThongKe_NguoiHocTheoKhoaComponent
  ]
})
export class ThongKe_NguoiHocTheoKhoaModule { }
