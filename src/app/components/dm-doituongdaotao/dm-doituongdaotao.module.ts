import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DM_DoiTuongDaoTaoFormComponent } from './dm-doituongdaotao-form/dm-doituongdaotao-form.component';
import { DM_DoiTuongDaoTaoRoutingModule } from './dm-doituongdaotao-routing.module';
import { DM_DoiTuongDaoTaoComponent } from './dm-doituongdaotao.component';


@NgModule({
  declarations: [
    DM_DoiTuongDaoTaoComponent,
    DM_DoiTuongDaoTaoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DM_DoiTuongDaoTaoRoutingModule
  ],
  exports: [
    DM_DoiTuongDaoTaoComponent
  ]
})
export class DM_DoiTuongDaoTaoModule { }
