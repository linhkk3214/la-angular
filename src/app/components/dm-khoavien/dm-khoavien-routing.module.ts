import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_KhoaVienComponent } from './dm-khoavien.component';

const routes: Routes = [
  {
    path: '',
    component: DM_KhoaVienComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_KhoaVienRoutingModule { }
