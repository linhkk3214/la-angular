import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DotNhapHoc_TpHoSoComponent } from './dotnhaphoc-tphoso.component';

const routes: Routes = [
  {
    path: '',
    component: DotNhapHoc_TpHoSoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotNhapHoc_TpHoSoRoutingModule { }
