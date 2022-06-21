import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DotCapNhatHoSoNguoiHocComponent } from './dotcapnhathosonguoihoc.component';

const routes: Routes = [
  {
    path: '',
    component: DotCapNhatHoSoNguoiHocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotCapNhatHoSoNguoiHocRoutingModule { }
