import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThongBaoFormComponent } from './thongbao-form/thongbao-form.component';
import { ThongBaoRoutingModule } from './thongbao-routing.module';
import { ThongBaoComponent } from './thongbao.component';


@NgModule({
  declarations: [
    ThongBaoComponent,
    ThongBaoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThongBaoRoutingModule
  ],
  exports: [
    ThongBaoComponent
  ]
})
export class ThongBaoModule { }
