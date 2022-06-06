import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DotNhapHocComponent } from './dotnhaphoc.component';

const routes: Routes = [
  {
    path: '',
    component: DotNhapHocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotNhapHocRoutingModule { }
