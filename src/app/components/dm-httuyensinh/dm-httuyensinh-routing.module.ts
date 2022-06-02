import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_HtTuyenSinhComponent } from './dm-httuyensinh.component';

const routes: Routes = [
  {
    path: '',
    component: DM_HtTuyenSinhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_HtTuyenSinhRoutingModule { }
