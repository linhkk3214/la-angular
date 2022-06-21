import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachDangKyHocNganh2Component } from './danhsachdangkyhocnganh2.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachDangKyHocNganh2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachDangKyHocNganh2RoutingModule { }
