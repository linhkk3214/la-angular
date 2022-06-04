import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_GioiTinhComponent } from './dm-gioitinh.component';

const routes: Routes = [
  {
    path: '',
    component: DM_GioiTinhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_GioiTinhRoutingModule { }
