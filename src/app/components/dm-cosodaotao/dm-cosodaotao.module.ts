import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_CoSoDaoTaoFormComponent } from './dm-cosodaotao-form/dm-cosodaotao-form.component';
import { DM_CoSoDaoTaoRoutingModule } from './dm-cosodaotao-routing.module';
import { DM_CoSoDaoTaoComponent } from './dm-cosodaotao.component';


@NgModule({
  declarations: [
    DM_CoSoDaoTaoComponent,
    DM_CoSoDaoTaoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_CoSoDaoTaoRoutingModule
  ],
  exports: [
    DM_CoSoDaoTaoComponent
  ]
})
export class DM_CoSoDaoTaoModule { }
