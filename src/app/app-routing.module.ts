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
  {
    path: 'dm-doituongtuyensinh',
    loadChildren: () => import('../app/components/dm-doituongtuyensinh/dm-doituongtuyensinh.module').then(m => m.DM_DoiTuongTuyenSinhModule)
  },
  {
    path: 'dm-donvilienket',
    loadChildren: () => import('../app/components/dm-donvilienket/dm-donvilienket.module').then(m => m.DM_DonViLienKetModule)
  },
  {
    path: 'dm-trangthainguoihoc',
    loadChildren: () => import('../app/components/dm-trangthainguoihoc/dm-trangthainguoihoc.module').then(m => m.DM_TrangThaiNguoiHocModule)
  },
  {
    path: 'dm-cosodaotao',
    loadChildren: () => import('../app/components/dm-cosodaotao/dm-cosodaotao.module').then(m => m.DM_CoSoDaoTaoModule)
  },
  {
    path: 'dm-khuvuc',
    loadChildren: () => import('../app/components/dm-khuvuc/dm-khuvuc.module').then(m => m.DM_KhuVucModule)
  },
  {
    path: 'dm-hocluc',
    loadChildren: () => import('../app/components/dm-hocluc/dm-hocluc.module').then(m => m.DM_HocLucModule)
  },
  {
    path: 'dm-hanhkiem',
    loadChildren: () => import('../app/components/dm-hanhkiem/dm-hanhkiem.module').then(m => m.DM_HanhKiemModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
