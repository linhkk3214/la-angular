import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuyetDinhHocBong_ThongKeComponent } from './quyetdinhhocbong-thongke.component';

const routes: Routes = [
  {
    path: '',
    component: QuyetDinhHocBong_ThongKeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuyetDinhHocBong_ThongKeRoutingModule { }
