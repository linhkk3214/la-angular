import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThongKe_NguoiHocTheoNganhRoutingModule } from './thongke-nguoihoctheonganh-routing.module';
import { ThongKe_NguoiHocTheoNganhComponent } from './thongke-nguoihoctheonganh.component';


@NgModule({
  declarations: [
    ThongKe_NguoiHocTheoNganhComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThongKe_NguoiHocTheoNganhRoutingModule,
  ],
  exports: [
    ThongKe_NguoiHocTheoNganhComponent
  ]
})
export class ThongKe_NguoiHocTheoNganhModule { }
