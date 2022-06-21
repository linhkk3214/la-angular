import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachQuyetDinhHocTapFormComponent } from './danhsachquyetdinhhoctap-form/danhsachquyetdinhhoctap-form.component';
import { DanhSachQuyetDinhHocTapRoutingModule } from './danhsachquyetdinhhoctap-routing.module';
import { DanhSachQuyetDinhHocTapComponent } from './danhsachquyetdinhhoctap.component';


@NgModule({
  declarations: [
    DanhSachQuyetDinhHocTapComponent,
    DanhSachQuyetDinhHocTapFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DanhSachQuyetDinhHocTapComponent,
    DanhSachQuyetDinhHocTapFormComponent
  ]
})
export class DanhSachQuyetDinhHocTapWithoutRouteModule { }

@NgModule({
  declarations: [
  ],
  imports: [
    DanhSachQuyetDinhHocTapWithoutRouteModule,
    DanhSachQuyetDinhHocTapRoutingModule
  ],
  exports: [
  ]
})
export class DanhSachQuyetDinhHocTapModule { }
