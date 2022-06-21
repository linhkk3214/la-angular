import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DotDangKyHocNganh2Component } from './dotdangkyhocnganh2.component';

const routes: Routes = [
  {
    path: '',
    component: DotDangKyHocNganh2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotDangKyHocNganh2RoutingModule { }
