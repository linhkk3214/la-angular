import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_TpHoSoFormComponent } from './dm-tphoso-form/dm-tphoso-form.component';
import { DM_TpHoSoRoutingModule } from './dm-tphoso-routing.module';
import { DM_TpHoSoComponent } from './dm-tphoso.component';


@NgModule({
  declarations: [
    DM_TpHoSoComponent,
    DM_TpHoSoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_TpHoSoRoutingModule
  ],
  exports: [
    DM_TpHoSoComponent
  ]
})
export class DM_TpHoSoModule { }
