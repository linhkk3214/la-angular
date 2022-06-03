import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_HanhKiemComponent } from './dm-hanhkiem.component';

const routes: Routes = [
  {
    path: '',
    component: DM_HanhKiemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_HanhKiemRoutingModule { }
