import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_HocKyComponent } from './dm-hocky.component';

const routes: Routes = [
  {
    path: '',
    component: DM_HocKyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_HocKyRoutingModule { }
