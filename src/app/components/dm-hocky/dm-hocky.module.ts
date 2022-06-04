import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_HocKyFormComponent } from './dm-hocky-form/dm-hocky-form.component';
import { DM_HocKyRoutingModule } from './dm-hocky-routing.module';
import { DM_HocKyComponent } from './dm-hocky.component';


@NgModule({
  declarations: [
    DM_HocKyComponent,
    DM_HocKyFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_HocKyRoutingModule
  ],
  exports: [
    DM_HocKyComponent
  ]
})
export class DM_HocKyModule { }
