import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachTrungTuyenComponent } from './danhsachtrungtuyen.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachTrungTuyenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachTrungTuyenRoutingModule { }
