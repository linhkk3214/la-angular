import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_NamHocFormComponent } from './dm-namhoc-form/dm-namhoc-form.component';
import { DM_NamHocRoutingModule } from './dm-namhoc-routing.module';
import { DM_NamHocComponent } from './dm-namhoc.component';


@NgModule({
  declarations: [
    DM_NamHocComponent,
    DM_NamHocFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_NamHocRoutingModule
  ],
  exports: [
    DM_NamHocComponent
  ]
})
export class DM_NamHocModule { }
