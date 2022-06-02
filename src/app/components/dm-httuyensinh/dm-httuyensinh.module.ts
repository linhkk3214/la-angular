import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_HtTuyenSinhFormComponent } from './dm-httuyensinh-form/dm-httuyensinh-form.component';
import { DM_HtTuyenSinhRoutingModule } from './dm-httuyensinh-routing.module';
import { DM_HtTuyenSinhComponent } from './dm-httuyensinh.component';


@NgModule({
  declarations: [
    DM_HtTuyenSinhComponent,
    DM_HtTuyenSinhFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_HtTuyenSinhRoutingModule
  ],
  exports: [
    DM_HtTuyenSinhComponent
  ]
})
export class DM_HtTuyenSinhModule { }
