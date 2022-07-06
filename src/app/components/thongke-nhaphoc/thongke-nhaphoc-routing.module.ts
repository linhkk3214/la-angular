import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThongKe_NhapHocComponent } from './thongke-nhaphoc.component';

const routes: Routes = [
  {
    path: '',
    component: ThongKe_NhapHocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongKe_NhapHocRoutingModule { }
