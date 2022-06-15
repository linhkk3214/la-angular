import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucDonViTaiTroComponent } from './danhmucdonvitaitro.component';

const routes: Routes = [
  {
    path: '',
    component: DanhMucDonViTaiTroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucDonViTaiTroRoutingModule { }
