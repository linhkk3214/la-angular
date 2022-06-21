import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_LoaiDonViTaiTroFormComponent } from './dm-loaidonvitaitro-form/dm-loaidonvitaitro-form.component';
import { DM_LoaiDonViTaiTroRoutingModule } from './dm-loaidonvitaitro-routing.module';
import { DM_LoaiDonViTaiTroComponent } from './dm-loaidonvitaitro.component';


@NgModule({
  declarations: [
    DM_LoaiDonViTaiTroComponent,
    DM_LoaiDonViTaiTroFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_LoaiDonViTaiTroRoutingModule
  ],
  exports: [
    DM_LoaiDonViTaiTroComponent
  ]
})
export class DM_LoaiDonViTaiTroModule { }
