import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_ChucVuComponent } from './dm-chucvu.component';

const routes: Routes = [
  {
    path: '',
    component: DM_ChucVuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_ChucVuRoutingModule { }
