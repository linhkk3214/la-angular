import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DanhMucHocBongFormComponent } from './danhmuchocbong-form/danhmuchocbong-form.component';
import { DanhMucHocBongRoutingModule } from './danhmuchocbong-routing.module';
import { DanhMucHocBongComponent } from './danhmuchocbong.component';


@NgModule({
  declarations: [
    DanhMucHocBongComponent,
    DanhMucHocBongFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DanhMucHocBongRoutingModule
  ],
  exports: [
    DanhMucHocBongComponent
  ]
})
export class DanhMucHocBongModule { }
