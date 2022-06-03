import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_DonViLienKetFormComponent } from './dm-donvilienket-form/dm-donvilienket-form.component';
import { DM_DonViLienKetRoutingModule } from './dm-donvilienket-routing.module';
import { DM_DonViLienKetComponent } from './dm-donvilienket.component';


@NgModule({
  declarations: [
    DM_DonViLienKetComponent,
    DM_DonViLienKetFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_DonViLienKetRoutingModule
  ],
  exports: [
    DM_DonViLienKetComponent
  ]
})
export class DM_DonViLienKetModule { }
