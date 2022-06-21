import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachLoaiKhenThuongComponent } from './danhsachloaikhenthuong.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachLoaiKhenThuongComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachLoaiKhenThuongRoutingModule { }
