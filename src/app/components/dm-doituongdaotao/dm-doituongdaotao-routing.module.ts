import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_DoiTuongDaoTaoComponent } from './dm-doituongdaotao.component';

const routes: Routes = [
  {
    path: '',
    component: DM_DoiTuongDaoTaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_DoiTuongDaoTaoRoutingModule { }
