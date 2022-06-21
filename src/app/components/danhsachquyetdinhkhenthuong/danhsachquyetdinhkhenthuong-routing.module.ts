import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachQuyetDinhKhenThuongComponent } from './danhsachquyetdinhkhenthuong.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachQuyetDinhKhenThuongComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachQuyetDinhKhenThuongRoutingModule { }
