import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_KhoaVienFormComponent } from './dm-khoavien-form/dm-khoavien-form.component';
import { DM_KhoaVienRoutingModule } from './dm-khoavien-routing.module';
import { DM_KhoaVienComponent } from './dm-khoavien.component';


@NgModule({
  declarations: [
    DM_KhoaVienComponent,
    DM_KhoaVienFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_KhoaVienRoutingModule
  ],
  exports: [
    DM_KhoaVienComponent
  ]
})
export class DM_KhoaVienModule { }
