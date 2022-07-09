import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThongKe_NguoiHocTheoKhoaComponent } from './thongke-nguoihoctheokhoa.component';

const routes: Routes = [
  {
    path: '',
    component: ThongKe_NguoiHocTheoKhoaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongKe_NguoiHocTheoKhoaRoutingModule { }
