import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThongKe_NhapHocRoutingModule } from './thongke-nhaphoc-routing.module';
import { ThongKe_NhapHocComponent } from './thongke-nhaphoc.component';


@NgModule({
  declarations: [
    ThongKe_NhapHocComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThongKe_NhapHocRoutingModule,
  ],
  exports: [
    ThongKe_NhapHocComponent
  ]
})
export class ThongKe_NhapHocModule { }
