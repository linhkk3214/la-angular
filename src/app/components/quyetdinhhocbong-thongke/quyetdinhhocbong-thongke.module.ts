import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { QuyetDinhHocBong_ThongKeRoutingModule } from './quyetdinhhocbong-thongke-routing.module';
import { QuyetDinhHocBong_ThongKeComponent } from './quyetdinhhocbong-thongke.component';


@NgModule({
  declarations: [
    QuyetDinhHocBong_ThongKeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuyetDinhHocBong_ThongKeRoutingModule,
  ],
  exports: [
    QuyetDinhHocBong_ThongKeComponent
  ]
})
export class QuyetDinhHocBong_ThongKeModule { }
