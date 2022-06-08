import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachLopHanhChinhFormComponent } from './danhsachlophanhchinh-form/danhsachlophanhchinh-form.component';
import { DanhSachLopHanhChinhRoutingModule } from './danhsachlophanhchinh-routing.module';
import { DanhSachLopHanhChinhComponent } from './danhsachlophanhchinh.component';


@NgModule({
  declarations: [
    DanhSachLopHanhChinhComponent,
    DanhSachLopHanhChinhFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhSachLopHanhChinhRoutingModule
  ],
  exports: [
    DanhSachLopHanhChinhComponent
  ]
})
export class DanhSachLopHanhChinhModule { }
