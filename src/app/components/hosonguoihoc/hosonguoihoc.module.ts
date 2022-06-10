import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HoSoNguoiHocFormComponent } from './hosonguoihoc-form/hosonguoihoc-form.component';
import { HoSoNguoiHocRoutingModule } from './hosonguoihoc-routing.module';
import { HoSoNguoiHocComponent } from './hosonguoihoc.component';


@NgModule({
  declarations: [
    HoSoNguoiHocComponent,
    HoSoNguoiHocFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HoSoNguoiHocRoutingModule,
  ],
  exports: [
    HoSoNguoiHocComponent
  ]
})
export class HoSoNguoiHocModule { }
