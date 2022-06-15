import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhMucDonViTaiTroFormComponent } from './danhmucdonvitaitro-form/danhmucdonvitaitro-form.component';
import { DanhMucDonViTaiTroRoutingModule } from './danhmucdonvitaitro-routing.module';
import { DanhMucDonViTaiTroComponent } from './danhmucdonvitaitro.component';


@NgModule({
  declarations: [
    DanhMucDonViTaiTroComponent,
    DanhMucDonViTaiTroFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhMucDonViTaiTroRoutingModule
  ],
  exports: [
    DanhMucDonViTaiTroComponent
  ]
})
export class DanhMucDonViTaiTroModule { }
