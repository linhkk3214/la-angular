import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachQuyetDinhKhenThuongFormComponent } from './danhsachquyetdinhkhenthuong-form/danhsachquyetdinhkhenthuong-form.component';
import { DanhSachQuyetDinhKhenThuongRoutingModule } from './danhsachquyetdinhkhenthuong-routing.module';
import { DanhSachQuyetDinhKhenThuongComponent } from './danhsachquyetdinhkhenthuong.component';


@NgModule({
  declarations: [
    DanhSachQuyetDinhKhenThuongComponent,
    DanhSachQuyetDinhKhenThuongFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DanhSachQuyetDinhKhenThuongComponent,
    DanhSachQuyetDinhKhenThuongFormComponent
  ]
})
export class DanhSachQuyetDinhKhenThuongWithoutRouteModule { }


@NgModule({
  declarations: [
  ],
  imports: [
    DanhSachQuyetDinhKhenThuongWithoutRouteModule,
    DanhSachQuyetDinhKhenThuongRoutingModule
  ],
  exports: [
  ]
})
export class DanhSachQuyetDinhKhenThuongModule { }
