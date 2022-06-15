import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HoSoNguoiHocFormComponent } from './hosonguoihoc-form/hosonguoihoc-form.component';
import { HoSoNguoiHoc_KhenThuong_KyLuatComponent } from './hosonguoihoc-khenthuong-kyluat/hosonguoihoc-khenthuong-kyluat.component';
import { HoSoNguoiHoc_KhenThuongComponent } from './hosonguoihoc-khenthuong/hosonguoihoc-khenthuong.component';
import { HoSoNguoiHocRoutingModule } from './hosonguoihoc-routing.module';
import { HoSoNguoiHocComponent } from './hosonguoihoc.component';


@NgModule({
  declarations: [
    HoSoNguoiHocComponent,
    HoSoNguoiHocFormComponent,
    HoSoNguoiHoc_KhenThuong_KyLuatComponent,
    HoSoNguoiHoc_KhenThuongComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HoSoNguoiHocRoutingModule,
  ],
  exports: [
    HoSoNguoiHocComponent
  ]
})
export class HoSoNguoiHocModule { }
