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
    path: 'dotnhaphoc',
    loadChildren: () => import('../app/components/dotnhaphoc/dotnhaphoc.module').then(m => m.DotNhapHocModule)
  },
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
  {
    path: 'dm-hedaotao',
    loadChildren: () => import('../app/components/dm-hedaotao/dm-hedaotao.module').then(m => m.DM_HeDaoTaoModule)
  },
  {
    path: 'dm-doituongdaotao',
    loadChildren: () => import('../app/components/dm-doituongdaotao/dm-doituongdaotao.module').then(m => m.DM_DoiTuongDaoTaoModule)
  },
  {
    path: 'dm-gioitinh',
    loadChildren: () => import('../app/components/dm-gioitinh/dm-gioitinh.module').then(m => m.DM_GioiTinhModule)
  },
  {
    path: 'dm-namhoc',
    loadChildren: () => import('../app/components/dm-namhoc/dm-namhoc.module').then(m => m.DM_NamHocModule)
  },
  {
    path: 'dm-hocky',
    loadChildren: () => import('../app/components/dm-hocky/dm-hocky.module').then(m => m.DM_HocKyModule)
  },
  {
    path: 'dm-khoahoc',
    loadChildren: () => import('../app/components/dm-khoahoc/dm-khoahoc.module').then(m => m.DM_KhoaHocModule)
  },
  {
    path: 'dm-trinhdodaotao',
    loadChildren: () => import('../app/components/dm-trinhdodaotao/dm-trinhdodaotao.module').then(m => m.DM_TrinhDoDaoTaoModule)
  },
  {
    path: 'dm-nganh',
    loadChildren: () => import('../app/components/dm-nganh/dm-nganh.module').then(m => m.DM_NganhModule)
  },
  {
    path: 'dm-khoavien',
    loadChildren: () => import('../app/components/dm-khoavien/dm-khoavien.module').then(m => m.DM_KhoaVienModule)
  },
  {
    path: 'dm-chuongtrinhdaotao',
    loadChildren: () => import('../app/components/dm-chuongtrinhdaotao/dm-chuongtrinhdaotao.module').then(m => m.DM_ChuongTrinhDaoTaoModule)
  },
  {
    path: 'dotnhaphoc',
    loadChildren: () => import('../app/components/dotnhaphoc/dotnhaphoc.module').then(m => m.DotNhapHocModule)
  },
  {
    path: 'danhsachtrungtuyen',
    loadChildren: () => import('../app/components/danhsachtrungtuyen/danhsachtrungtuyen.module').then(m => m.DanhSachTrungTuyenModule)
  },
  {
    path: 'danhsachlophanhchinh',
    loadChildren: () => import('../app/components/danhsachlophanhchinh/danhsachlophanhchinh.module').then(m => m.DanhSachLopHanhChinhModule)
  },
  {
    path: 'hosonguoihoc',
    loadChildren: () => import('../app/components/hosonguoihoc/hosonguoihoc.module').then(m => m.HoSoNguoiHocModule)
  },
  {
    path: 'dotcapnhathosonguoihoc',
    loadChildren: () => import('../app/components/dotcapnhathosonguoihoc/dotcapnhathosonguoihoc.module').then(m => m.DotCapNhatHoSoNguoiHocModule)
  },
  {
    path: 'danhsachquyetdinhchuyennganh',
    loadChildren: () => import('../app/components/danhsachquyetdinhchuyennganh/danhsachquyetdinhchuyennganh.module').then(m => m.DanhSachQuyetDinhChuyenNganhModule)
  },
  {
    path: 'danhsachloaikhenthuong',
    loadChildren: () => import('../app/components/danhsachloaikhenthuong/danhsachloaikhenthuong.module').then(m => m.DanhSachLoaiKhenThuongModule)
  },
  {
    path: 'danhsachquyetdinhkhenthuong',
    loadChildren: () => import('../app/components/danhsachquyetdinhkhenthuong/danhsachquyetdinhkhenthuong.module').then(m => m.DanhSachQuyetDinhKhenThuongModule)
  },
  {
    path: 'danhsachloaiquyetdinh',
    loadChildren: () => import('../app/components/danhsachloaiquyetdinh/danhsachloaiquyetdinh.module').then(m => m.DanhSachLoaiQuyetDinhModule)
  },
  {
    path: 'danhsachquyetdinhhoctap',
    loadChildren: () => import('../app/components/danhsachquyetdinhhoctap/danhsachquyetdinhhoctap.module').then(m => m.DanhSachQuyetDinhHocTapModule)
  },
  {
    path: 'dm-loaidonvitaitro',
    loadChildren: () => import('../app/components/dm-loaidonvitaitro/dm-loaidonvitaitro.module').then(m => m.DM_LoaiDonViTaiTroModule)
  },
  {
    path: 'danhmucdonvitaitro',
    loadChildren: () => import('../app/components/danhmucdonvitaitro/danhmucdonvitaitro.module').then(m => m.DanhMucDonViTaiTroModule)
  },
  {
    path: 'danhmuchocbong',
    loadChildren: () => import('../app/components/danhmuchocbong/danhmuchocbong.module').then(m => m.DanhMucHocBongModule)
  },
  {
    path: 'danhsachquyetdinhhocbong',
    loadChildren: () => import('../app/components/danhsachquyetdinhhocbong/danhsachquyetdinhhocbong.module').then(m => m.DanhSachQuyetDinhHocBongModule)
  },
  {
    path: 'quyetdinhkhenthuong-thongke',
    loadChildren: () => import('../app/components/quyetdinhkhenthuong-thongke/quyetdinhkhenthuong-thongke.module').then(m => m.QuyetDinhKhenThuong_ThongKeModule)
  },
  {
    path: 'quyetdinhhoctap-thongke',
    loadChildren: () => import('../app/components/quyetdinhhoctap-thongke/quyetdinhhoctap-thongke.module').then(m => m.QuyetDinhHocTap_ThongKeModule)
  },
  {
    path: 'quyetdinhhocbong-thongke',
    loadChildren: () => import('../app/components/quyetdinhhocbong-thongke/quyetdinhhocbong-thongke.module').then(m => m.QuyetDinhHocBong_ThongKeModule)
  },
  {
    path: 'dotdangkyhocnganh2',
    loadChildren: () => import('../app/components/dotdangkyhocnganh2/dotdangkyhocnganh2.module').then(m => m.DotDangKyHocNganh2Module)
  },
  {
    path: 'danhsachdangkyhocnganh2',
    loadChildren: () => import('../app/components/danhsachdangkyhocnganh2/danhsachdangkyhocnganh2.module').then(m => m.DanhSachDangKyHocNganh2Module)
  },
  {
    path: 'thongbao',
    loadChildren: () => import('../app/components/thongbao/thongbao.module').then(m => m.ThongBaoModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
