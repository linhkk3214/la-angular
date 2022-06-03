import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_KhuVucComponent } from './dm-khuvuc.component';

const routes: Routes = [
  {
    path: '',
    component: DM_KhuVucComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_KhuVucRoutingModule { }
