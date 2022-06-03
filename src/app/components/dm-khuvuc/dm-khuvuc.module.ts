import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_KhuVucFormComponent } from './dm-khuvuc-form/dm-khuvuc-form.component';
import { DM_KhuVucRoutingModule } from './dm-khuvuc-routing.module';
import { DM_KhuVucComponent } from './dm-khuvuc.component';


@NgModule({
  declarations: [
    DM_KhuVucComponent,
    DM_KhuVucFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_KhuVucRoutingModule
  ],
  exports: [
    DM_KhuVucComponent
  ]
})
export class DM_KhuVucModule { }
