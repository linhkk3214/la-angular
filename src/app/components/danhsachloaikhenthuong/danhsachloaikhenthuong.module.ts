import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachLoaiKhenThuongFormComponent } from './danhsachloaikhenthuong-form/danhsachloaikhenthuong-form.component';
import { DanhSachLoaiKhenThuongRoutingModule } from './danhsachloaikhenthuong-routing.module';
import { DanhSachLoaiKhenThuongComponent } from './danhsachloaikhenthuong.component';


@NgModule({
  declarations: [
    DanhSachLoaiKhenThuongComponent,
    DanhSachLoaiKhenThuongFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhSachLoaiKhenThuongRoutingModule
  ],
  exports: [
    DanhSachLoaiKhenThuongComponent
  ]
})
export class DanhSachLoaiKhenThuongModule { }
