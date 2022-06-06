import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_TrinhDoDaoTaoFormComponent } from './dm-trinhdodaotao-form/dm-trinhdodaotao-form.component';
import { DM_TrinhDoDaoTaoRoutingModule } from './dm-trinhdodaotao-routing.module';
import { DM_TrinhDoDaoTaoComponent } from './dm-trinhdodaotao.component';


@NgModule({
  declarations: [
    DM_TrinhDoDaoTaoComponent,
    DM_TrinhDoDaoTaoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_TrinhDoDaoTaoRoutingModule
  ],
  exports: [
    DM_TrinhDoDaoTaoComponent
  ]
})
export class DM_TrinhDoDaoTaoModule { }
