import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_HocLucComponent } from './dm-hocluc.component';

const routes: Routes = [
  {
    path: '',
    component: DM_HocLucComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_HocLucRoutingModule { }
