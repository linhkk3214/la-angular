import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DotDangKyHocNganh2FormComponent } from './dotdangkyhocnganh2-form/dotdangkyhocnganh2-form.component';
import { DotDangKyHocNganh2RoutingModule } from './dotdangkyhocnganh2-routing.module';
import { DotDangKyHocNganh2Component } from './dotdangkyhocnganh2.component';


@NgModule({
  declarations: [
    DotDangKyHocNganh2Component,
    DotDangKyHocNganh2FormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DotDangKyHocNganh2RoutingModule
  ],
  exports: [
    DotDangKyHocNganh2Component
  ]
})
export class DotDangKyHocNganh2Module { }
