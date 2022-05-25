import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_LoaiNguoiDungComponent } from './dm-loainguoidung.component';

const routes: Routes = [
  {
    path: '',
    component: DM_LoaiNguoiDungComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_LoaiNguoiDungRoutingModule { }
