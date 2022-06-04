import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_NamHocComponent } from './dm-namhoc.component';

const routes: Routes = [
  {
    path: '',
    component: DM_NamHocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_NamHocRoutingModule { }
