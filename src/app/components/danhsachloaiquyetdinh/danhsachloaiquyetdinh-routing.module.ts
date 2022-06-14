import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachLoaiQuyetDinhComponent } from './danhsachloaiquyetdinh.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachLoaiQuyetDinhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachLoaiQuyetDinhRoutingModule { }
