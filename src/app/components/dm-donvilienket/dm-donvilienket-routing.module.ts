import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DM_DonViLienKetComponent } from './dm-donvilienket.component';

const routes: Routes = [
  {
    path: '',
    component: DM_DonViLienKetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DM_DonViLienKetRoutingModule { }
