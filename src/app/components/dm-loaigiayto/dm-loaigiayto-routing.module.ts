import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_LoaiGiayToComponent } from './dm-loaigiayto.component';

const routes: Routes = [
  {
    path: '',
    component: DM_LoaiGiayToComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_LoaiGiayToRoutingModule { }
