import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucHocBongComponent } from './danhmuchocbong.component';

const routes: Routes = [
  {
    path: '',
    component: DanhMucHocBongComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucHocBongRoutingModule { }
