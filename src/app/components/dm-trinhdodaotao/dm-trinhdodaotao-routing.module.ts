import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_TrinhDoDaoTaoComponent } from './dm-trinhdodaotao.component';

const routes: Routes = [
  {
    path: '',
    component: DM_TrinhDoDaoTaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_TrinhDoDaoTaoRoutingModule { }
