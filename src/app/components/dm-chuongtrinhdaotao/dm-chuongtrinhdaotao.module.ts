import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_ChuongTrinhDaoTaoFormComponent } from './dm-chuongtrinhdaotao-form/dm-chuongtrinhdaotao-form.component';
import { DM_ChuongTrinhDaoTaoRoutingModule } from './dm-chuongtrinhdaotao-routing.module';
import { DM_ChuongTrinhDaoTaoComponent } from './dm-chuongtrinhdaotao.component';


@NgModule({
  declarations: [
    DM_ChuongTrinhDaoTaoComponent,
    DM_ChuongTrinhDaoTaoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_ChuongTrinhDaoTaoRoutingModule
  ],
  exports: [
    DM_ChuongTrinhDaoTaoComponent
  ]
})
export class DM_ChuongTrinhDaoTaoModule { }
