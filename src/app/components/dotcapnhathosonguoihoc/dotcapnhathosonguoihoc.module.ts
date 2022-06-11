import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DotCapNhatHoSoNguoiHocFormComponent } from './dotcapnhathosonguoihoc-form/dotcapnhathosonguoihoc-form.component';
import { DotCapNhatHoSoNguoiHocRoutingModule } from './dotcapnhathosonguoihoc-routing.module';
import { DotCapNhatHoSoNguoiHocComponent } from './dotcapnhathosonguoihoc.component';


@NgModule({
  declarations: [
    DotCapNhatHoSoNguoiHocComponent,
    DotCapNhatHoSoNguoiHocFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DotCapNhatHoSoNguoiHocRoutingModule
  ],
  exports: [
    DotCapNhatHoSoNguoiHocComponent
  ]
})
export class DotCapNhatHoSoNguoiHocModule { }
