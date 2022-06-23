import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThongBaoComponent } from './thongbao.component';

const routes: Routes = [
  {
    path: '',
    component: ThongBaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongBaoRoutingModule { }
