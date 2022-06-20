import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachQuyetDinhHocBongWithoutRouteModule } from '../danhsachquyetdinhhocbong/danhsachquyetdinhhocbong.module';
import { DanhSachQuyetDinhHocTapWithoutRouteModule } from '../danhsachquyetdinhhoctap/danhsachquyetdinhhoctap.module';
import { DanhSachQuyetDinhKhenThuongFormComponent } from '../danhsachquyetdinhkhenthuong/danhsachquyetdinhkhenthuong-form/danhsachquyetdinhkhenthuong-form.component';
import { DanhSachQuyetDinhKhenThuongWithoutRouteModule } from '../danhsachquyetdinhkhenthuong/danhsachquyetdinhkhenthuong.module';
import { HoSoNguoiHocFormComponent } from './hosonguoihoc-form/hosonguoihoc-form.component';
import { HoSoNguoiHoc_HocBongComponent } from './hosonguoihoc-hocbong/hosonguoihoc-hocbong.component';
import { HoSoNguoiHoc_KhenThuong_KyLuatComponent } from './hosonguoihoc-khenthuong-kyluat/hosonguoihoc-khenthuong-kyluat.component';
import { HoSoNguoiHoc_KhenThuongComponent } from './hosonguoihoc-khenthuong/hosonguoihoc-khenthuong.component';
import { HoSoNguoiHoc_QuyetDinhHocTapComponent } from './hosonguoihoc-quyetdinhhoctap/hosonguoihoc-quyetdinhhoctap.component';
import { HoSoNguoiHocRoutingModule } from './hosonguoihoc-routing.module';
import { HoSoNguoiHoc_ThongTinTuyenSinhComponent } from './hosonguoihoc-thongtintuyensinh/hosonguoihoc-thongtintuyensinh.component';
import { HoSoNguoiHocComponent } from './hosonguoihoc.component';


@NgModule({
  declarations: [
    HoSoNguoiHocComponent,
    HoSoNguoiHocFormComponent,
    HoSoNguoiHoc_KhenThuong_KyLuatComponent,
    HoSoNguoiHoc_KhenThuongComponent,
    HoSoNguoiHoc_ThongTinTuyenSinhComponent,
    HoSoNguoiHoc_HocBongComponent,
    HoSoNguoiHoc_QuyetDinhHocTapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HoSoNguoiHocRoutingModule,
    DanhSachQuyetDinhKhenThuongWithoutRouteModule,
    DanhSachQuyetDinhHocTapWithoutRouteModule,
    DanhSachQuyetDinhHocBongWithoutRouteModule
  ],
  exports: [
    HoSoNguoiHocComponent
  ]
})
export class HoSoNguoiHocModule { }
