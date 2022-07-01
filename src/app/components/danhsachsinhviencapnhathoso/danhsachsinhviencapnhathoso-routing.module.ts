import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachSinhVienCapNhatHoSoComponent } from './danhsachsinhviencapnhathoso.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachSinhVienCapNhatHoSoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachSinhVienCapNhatHoSoRoutingModule { }
