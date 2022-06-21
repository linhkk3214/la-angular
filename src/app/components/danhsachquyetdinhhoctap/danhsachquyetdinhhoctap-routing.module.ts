import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachQuyetDinhHocTapComponent } from './danhsachquyetdinhhoctap.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachQuyetDinhHocTapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachQuyetDinhHocTapRoutingModule { }
