import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_KhoaHocComponent } from './dm-khoahoc.component';

const routes: Routes = [
  {
    path: '',
    component: DM_KhoaHocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_KhoaHocRoutingModule { }
