import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    loadChildren: () => import('../app/components/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'dm-loaigiayto',
    loadChildren: () => import('../app/components/dm-loaigiayto/dm-loaigiayto.module').then(m => m.DM_LoaiGiayToModule)
  },
  {
    path: 'dm-tphoso',
    loadChildren: () => import('../app/components/dm-tphoso/dm-tphoso.module').then(m => m.DM_TpHoSoModule)
  },
  {
    path: 'dm-httuyensinh',
    loadChildren: () => import('../app/components/dm-httuyensinh/dm-httuyensinh.module').then(m => m.DM_HtTuyenSinhModule)
  },
  {
    path: 'dm-doituonguutien',
    loadChildren: () => import('../app/components/dm-doituonguutien/dm-doituonguutien.module').then(m => m.DM_DoiTuongUuTienModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
