import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_DoiTuongUuTienFormComponent } from './dm-doituonguutien-form/dm-doituonguutien-form.component';
import { DM_DoiTuongUuTienRoutingModule } from './dm-doituonguutien-routing.module';
import { DM_DoiTuongUuTienComponent } from './dm-doituonguutien.component';


@NgModule({
  declarations: [
    DM_DoiTuongUuTienComponent,
    DM_DoiTuongUuTienFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_DoiTuongUuTienRoutingModule
  ],
  exports: [
    DM_DoiTuongUuTienComponent
  ]
})
export class DM_DoiTuongUuTienModule { }


