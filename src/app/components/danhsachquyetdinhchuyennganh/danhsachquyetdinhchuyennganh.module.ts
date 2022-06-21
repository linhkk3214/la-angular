import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhSachQuyetDinhChuyenNganhFormComponent } from './danhsachquyetdinhchuyennganh-form/danhsachquyetdinhchuyennganh-form.component';
import { DanhSachQuyetDinhChuyenNganhRoutingModule } from './danhsachquyetdinhchuyennganh-routing.module';
import { DanhSachQuyetDinhChuyenNganhComponent } from './danhsachquyetdinhchuyennganh.component';


@NgModule({
  declarations: [
    DanhSachQuyetDinhChuyenNganhComponent,
    DanhSachQuyetDinhChuyenNganhFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhSachQuyetDinhChuyenNganhRoutingModule
  ],
  exports: [
    DanhSachQuyetDinhChuyenNganhComponent
  ]
})
export class DanhSachQuyetDinhChuyenNganhModule { }
