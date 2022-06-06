import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DotNhapHoc_HoSoFormComponent } from './dotnhaphoc-hoso-form/dotnhaphoc-hoso-form.component';
import { DotNhapHoc_HoSoRoutingModule } from './dotnhaphoc-hoso-routing.module';
import { DotNhapHoc_HoSoComponent } from './dotnhaphoc-hoso.component';


@NgModule({
  declarations: [
    DotNhapHoc_HoSoComponent,
    DotNhapHoc_HoSoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DotNhapHoc_HoSoRoutingModule
  ],
  exports: [
    DotNhapHoc_HoSoComponent
  ]
})
export class DotNhapHoc_HoSoModule { }
