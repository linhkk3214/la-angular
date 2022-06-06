import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_NganhComponent } from './dm-nganh.component';

const routes: Routes = [
  {
    path: '',
    component: DM_NganhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_NganhRoutingModule { }
