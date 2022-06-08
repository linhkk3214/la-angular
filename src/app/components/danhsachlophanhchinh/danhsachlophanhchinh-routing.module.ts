import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachLopHanhChinhComponent } from './danhsachlophanhchinh.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachLopHanhChinhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachLopHanhChinhRoutingModule { }
