import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_DoiTuongTuyenSinhComponent } from './dm-doituongtuyensinh.component';

const routes: Routes = [
  {
    path: '',
    component: DM_DoiTuongTuyenSinhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_DoiTuongTuyenSinhRoutingModule { }
