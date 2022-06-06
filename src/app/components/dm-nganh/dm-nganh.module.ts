import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_NganhFormComponent } from './dm-nganh-form/dm-nganh-form.component';
import { DM_NganhRoutingModule } from './dm-nganh-routing.module';
import { DM_NganhComponent } from './dm-nganh.component';


@NgModule({
  declarations: [
    DM_NganhComponent,
    DM_NganhFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_NganhRoutingModule
  ],
  exports: [
    DM_NganhComponent
  ]
})
export class DM_NganhModule { }
