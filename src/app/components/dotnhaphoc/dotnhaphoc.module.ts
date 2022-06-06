import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DotNhapHoc_TpHoSoWithoutRouteModule } from '../dotnhaphoc-tphoso/dotnhaphoc-tphoso.module';
import { DotNhapHocFormComponent } from './dotnhaphoc-form/dotnhaphoc-form.component';
import { DotNhapHocRoutingModule } from './dotnhaphoc-routing.module';
import { DotNhapHocComponent } from './dotnhaphoc.component';


@NgModule({
  declarations: [
    DotNhapHocComponent,
    DotNhapHocFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DotNhapHocRoutingModule,
    DotNhapHoc_TpHoSoWithoutRouteModule
  ],
  exports: [
    DotNhapHocComponent
  ]
})
export class DotNhapHocModule { }
