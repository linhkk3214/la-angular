import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_KhoaHocFormComponent } from './dm-khoahoc-form/dm-khoahoc-form.component';
import { DM_KhoaHocRoutingModule } from './dm-khoahoc-routing.module';
import { DM_KhoaHocComponent } from './dm-khoahoc.component';


@NgModule({
  declarations: [
    DM_KhoaHocComponent,
    DM_KhoaHocFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_KhoaHocRoutingModule
  ],
  exports: [
    DM_KhoaHocComponent
  ]
})
export class DM_KhoaHocModule { }
