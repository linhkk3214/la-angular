import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachQuyetDinhHocBongFormComponent } from './danhsachquyetdinhhocbong-form/danhsachquyetdinhhocbong-form.component';
import { DanhSachQuyetDinhHocBongRoutingModule } from './danhsachquyetdinhhocbong-routing.module';
import { DanhSachQuyetDinhHocBongComponent } from './danhsachquyetdinhhocbong.component';


@NgModule({
  declarations: [
    DanhSachQuyetDinhHocBongComponent,
    DanhSachQuyetDinhHocBongFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    DanhSachQuyetDinhHocBongComponent,
    DanhSachQuyetDinhHocBongFormComponent
  ]
})
export class DanhSachQuyetDinhHocBongWithoutRouteModule { }

@NgModule({
  declarations: [
  ],
  imports: [
    DanhSachQuyetDinhHocBongRoutingModule,
    DanhSachQuyetDinhHocBongWithoutRouteModule
  ],
  exports: [
  ]
})
export class DanhSachQuyetDinhHocBongModule { }
