import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_DoiTuongUuTienComponent } from './dm-doituonguutien.component';

const routes: Routes = [
  {
    path: '',
    component: DM_DoiTuongUuTienComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_DoiTuongUuTienRoutingModule { }
