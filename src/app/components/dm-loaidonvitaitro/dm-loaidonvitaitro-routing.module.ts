import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_LoaiDonViTaiTroComponent } from './dm-loaidonvitaitro.component';

const routes: Routes = [
  {
    path: '',
    component: DM_LoaiDonViTaiTroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_LoaiDonViTaiTroRoutingModule { }
