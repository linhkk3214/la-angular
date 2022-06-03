import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_TrangThaiNguoiHocComponent } from './dm-trangthainguoihoc.component';

const routes: Routes = [
  {
    path: '',
    component: DM_TrangThaiNguoiHocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_TrangThaiNguoiHocRoutingModule { }
