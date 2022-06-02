import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_LoaiGiayToFormComponent } from './dm-loaigiayto-form/dm-loaigiayto-form.component';
import { DM_LoaiGiayToRoutingModule } from './dm-loaigiayto-routing.module';
import { DM_LoaiGiayToComponent } from './dm-loaigiayto.component';


@NgModule({
  declarations: [
    DM_LoaiGiayToComponent,
    DM_LoaiGiayToFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_LoaiGiayToRoutingModule
  ],
  exports: [
    DM_LoaiGiayToComponent
  ]
})
export class DM_LoaiGiayToModule { }
