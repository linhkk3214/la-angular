import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_TpHoSoComponent } from './dm-tphoso.component';

const routes: Routes = [
  {
    path: '',
    component: DM_TpHoSoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_TpHoSoRoutingModule { }
