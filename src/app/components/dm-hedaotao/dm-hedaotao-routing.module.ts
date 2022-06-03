import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_HeDaoTaoComponent } from './dm-hedaotao.component';

const routes: Routes = [
  {
    path: '',
    component: DM_HeDaoTaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_HeDaoTaoRoutingModule { }
