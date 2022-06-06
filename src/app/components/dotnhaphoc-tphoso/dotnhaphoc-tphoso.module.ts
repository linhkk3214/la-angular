import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DotNhapHoc_TpHoSoFormComponent } from './dotnhaphoc-tphoso-form/dotnhaphoc-tphoso-form.component';
import { DotNhapHoc_TpHoSoRoutingModule } from './dotnhaphoc-tphoso-routing.module';
import { DotNhapHoc_TpHoSoComponent } from './dotnhaphoc-tphoso.component';


@NgModule({
  declarations: [
    DotNhapHoc_TpHoSoComponent,
    DotNhapHoc_TpHoSoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    DotNhapHoc_TpHoSoComponent
  ]
})
export class DotNhapHoc_TpHoSoWithoutRouteModule { }

@NgModule({
  imports: [
    DotNhapHoc_TpHoSoWithoutRouteModule,
    DotNhapHoc_TpHoSoRoutingModule
  ],
  exports: [
    DotNhapHoc_TpHoSoComponent
  ]
})
export class DotNhapHoc_TpHoSoModule { }
