import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachSinhVienCapNhatHoSoFormComponent } from './danhsachsinhviencapnhathoso-form/danhsachsinhviencapnhathoso-form.component';
import { DanhSachSinhVienCapNhatHoSoRoutingModule } from './danhsachsinhviencapnhathoso-routing.module';
import { DanhSachSinhVienCapNhatHoSoComponent } from './danhsachsinhviencapnhathoso.component';


@NgModule({
  declarations: [
    DanhSachSinhVienCapNhatHoSoComponent,
    DanhSachSinhVienCapNhatHoSoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhSachSinhVienCapNhatHoSoRoutingModule
  ],
  exports: [
    DanhSachSinhVienCapNhatHoSoComponent
  ]
})
export class DanhSachSinhVienCapNhatHoSoModule { }
