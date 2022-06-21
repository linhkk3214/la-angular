import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuyetDinhHocTap_ThongKeComponent } from './quyetdinhhoctap-thongke.component';

const routes: Routes = [
  {
    path: '',
    component: QuyetDinhHocTap_ThongKeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuyetDinhHocTap_ThongKeRoutingModule { }
