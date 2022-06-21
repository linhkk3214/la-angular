import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { QuyetDinhKhenThuong_ThongKeRoutingModule } from './quyetdinhkhenthuong-thongke-routing.module';
import { QuyetDinhKhenThuong_ThongKeComponent } from './quyetdinhkhenthuong-thongke.component';


@NgModule({
  declarations: [
    QuyetDinhKhenThuong_ThongKeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuyetDinhKhenThuong_ThongKeRoutingModule,
  ],
  exports: [
    QuyetDinhKhenThuong_ThongKeComponent
  ]
})
export class QuyetDinhKhenThuong_ThongKeModule { }
