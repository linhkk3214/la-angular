import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DotNhapHoc_HoSoComponent } from './dotnhaphoc-hoso.component';

const routes: Routes = [
  {
    path: '',
    component: DotNhapHoc_HoSoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotNhapHoc_HoSoRoutingModule { }
