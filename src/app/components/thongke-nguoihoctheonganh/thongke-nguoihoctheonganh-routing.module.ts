import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThongKe_NguoiHocTheoNganhComponent } from './thongke-nguoihoctheonganh.component';

const routes: Routes = [
  {
    path: '',
    component: ThongKe_NguoiHocTheoNganhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongKe_NguoiHocTheoNganhRoutingModule { }
