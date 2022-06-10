import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoSoNguoiHocComponent } from './hosonguoihoc.component';

const routes: Routes = [
  {
    path: '',
    component: HoSoNguoiHocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoSoNguoiHocRoutingModule { }
