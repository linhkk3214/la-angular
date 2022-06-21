import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { QuyetDinhHocTap_ThongKeRoutingModule } from './quyetdinhhoctap-thongke-routing.module';
import { QuyetDinhHocTap_ThongKeComponent } from './quyetdinhhoctap-thongke.component';


@NgModule({
  declarations: [
    QuyetDinhHocTap_ThongKeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuyetDinhHocTap_ThongKeRoutingModule,
  ],
  exports: [
    QuyetDinhHocTap_ThongKeComponent
  ]
})
export class QuyetDinhHocTap_ThongKeModule { }
