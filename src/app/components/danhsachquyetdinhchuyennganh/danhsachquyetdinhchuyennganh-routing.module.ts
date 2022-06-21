import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachQuyetDinhChuyenNganhComponent } from './danhsachquyetdinhchuyennganh.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachQuyetDinhChuyenNganhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachQuyetDinhChuyenNganhRoutingModule { }
