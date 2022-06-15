import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachQuyetDinhHocBongComponent } from './danhsachquyetdinhhocbong.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachQuyetDinhHocBongComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachQuyetDinhHocBongRoutingModule { }
