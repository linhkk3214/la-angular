import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuyetDinhKhenThuong_ThongKeComponent } from './quyetdinhkhenthuong-thongke.component';

const routes: Routes = [
  {
    path: '',
    component: QuyetDinhKhenThuong_ThongKeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuyetDinhKhenThuong_ThongKeRoutingModule { }
