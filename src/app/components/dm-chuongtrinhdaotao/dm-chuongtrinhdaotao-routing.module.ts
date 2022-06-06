import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_ChuongTrinhDaoTaoComponent } from './dm-chuongtrinhdaotao.component';

const routes: Routes = [
  {
    path: '',
    component: DM_ChuongTrinhDaoTaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_ChuongTrinhDaoTaoRoutingModule { }
