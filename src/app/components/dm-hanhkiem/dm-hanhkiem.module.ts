import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_HanhKiemFormComponent } from './dm-hanhkiem-form/dm-hanhkiem-form.component';
import { DM_HanhKiemRoutingModule } from './dm-hanhkiem-routing.module';
import { DM_HanhKiemComponent } from './dm-hanhkiem.component';


@NgModule({
  declarations: [
    DM_HanhKiemComponent,
    DM_HanhKiemFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_HanhKiemRoutingModule
  ],
  exports: [
    DM_HanhKiemComponent
  ]
})
export class DM_HanhKiemModule { }
