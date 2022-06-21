import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachDangKyHocNganh2FormComponent } from './danhsachdangkyhocnganh2-form/danhsachdangkyhocnganh2-form.component';
import { DanhSachDangKyHocNganh2RoutingModule } from './danhsachdangkyhocnganh2-routing.module';
import { DanhSachDangKyHocNganh2Component } from './danhsachdangkyhocnganh2.component';


@NgModule({
  declarations: [
    DanhSachDangKyHocNganh2Component,
    DanhSachDangKyHocNganh2FormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhSachDangKyHocNganh2RoutingModule
  ],
  exports: [
    DanhSachDangKyHocNganh2Component
  ]
})
export class DanhSachDangKyHocNganh2Module { }
