import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_CoSoDaoTaoComponent } from './dm-cosodaotao.component';

const routes: Routes = [
  {
    path: '',
    component: DM_CoSoDaoTaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_CoSoDaoTaoRoutingModule { }
