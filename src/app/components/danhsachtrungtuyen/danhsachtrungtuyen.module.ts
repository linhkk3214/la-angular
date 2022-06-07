import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachTrungTuyenFormComponent } from './danhsachtrungtuyen-form/danhsachtrungtuyen-form.component';
import { DanhSachTrungTuyenRoutingModule } from './danhsachtrungtuyen-routing.module';
import { DanhSachTrungTuyenComponent } from './danhsachtrungtuyen.component';


@NgModule({
  declarations: [
    DanhSachTrungTuyenComponent,
    DanhSachTrungTuyenFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhSachTrungTuyenRoutingModule,
  ],
  exports: [
    DanhSachTrungTuyenComponent
  ]
})
export class DanhSachTrungTuyenModule { }
