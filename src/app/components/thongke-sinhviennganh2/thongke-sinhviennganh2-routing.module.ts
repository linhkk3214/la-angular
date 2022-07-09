import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThongKe_SinhVienNganh2Component } from './thongke-sinhviennganh2.component';

const routes: Routes = [
  {
    path: '',
    component: ThongKe_SinhVienNganh2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongKe_SinhVienNganh2RoutingModule { }
