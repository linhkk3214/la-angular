import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_HeDaoTaoFormComponent } from './dm-hedaotao-form/dm-hedaotao-form.component';
import { DM_HeDaoTaoRoutingModule } from './dm-hedaotao-routing.module';
import { DM_HeDaoTaoComponent } from './dm-hedaotao.component';


@NgModule({
  declarations: [
    DM_HeDaoTaoComponent,
    DM_HeDaoTaoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_HeDaoTaoRoutingModule
  ],
  exports: [
    DM_HeDaoTaoComponent
  ]
})
export class DM_HeDaoTaoModule { }
