import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, TabViewData } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachTrungTuyenService } from './services/danhsachtrungtuyen.service';
import { DataType, Operator } from 'src/app/shared/models/enums';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { DataSourceTrangThai } from './models/const';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { QuocTichService } from '../user/services/quoctich.service';
import { DanTocService } from '../user/services/dantoc.service';
import { DM_GioiTinhService } from '../dm-gioitinh/services/dm-gioitinh.service';
import { AddressService } from '../user/services/address.service';
import { DM_NganhService } from '../dm-nganh/services/dm-nganh.service';
import { DM_KhuVucService } from '../dm-khuvuc/services/dm-khuvuc.service';
import { DM_HtTuyenSinhService } from '../dm-httuyensinh/services/dm-httuyensinh.service';
import { DM_DoiTuongTuyenSinhService } from '../dm-doituongtuyensinh/services/dm-doituongtuyensinh.service';
import { DM_DoiTuongUuTienService } from '../dm-doituonguutien/services/dm-doituonguutien.service';
import { DM_DoiTuongDaoTaoService } from '../dm-doituongdaotao/services/dm-doituongdaotao.service';
import { DM_HocLucService } from '../dm-hocluc/services/dm-hocluc.service';
import { DM_HanhKiemService } from '../dm-hanhkiem/services/dm-hanhkiem.service';
import { DotNhapHocService } from '../dotnhaphoc/services/dotnhaphoc.service';
@Component({
  selector: 'danhsachtrungtuyen',
  templateUrl: './danhsachtrungtuyen.component.html',
  styleUrls: ['./danhsachtrungtuyen.component.scss']
})
export class DanhSachTrungTuyenComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachTrungTuyenService: DanhSachTrungTuyenService,
    private _dm_DotNhapHocService: DotNhapHocService,
    private _dm_QuocTichService: QuocTichService,
    private _dm_DanTocService: DanTocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _addressService: AddressService,
    private _DM_NganhService: DM_NganhService,
    private _DM_KhuVucService: DM_KhuVucService,
    private _DM_HtTuyenSinhService: DM_HtTuyenSinhService,
    private _DM_DoiTuongTuyenSinhService: DM_DoiTuongTuyenSinhService,
    private _DM_DoiTuongUuTienService: DM_DoiTuongUuTienService,
    private _DM_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
    private _DM_HocLucService: DM_HocLucService,
    private _DM_HanhKiemService: DM_HanhKiemService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'trúng tuyển';
    this.setting.service = this._DanhSachTrungTuyenService;
    this.setting.popupSize.width = 1800;
    this.setting.popupSize.height = 800;
    this.setting.cols = [
      new ColumnSchema({
        field: 'maNhapHoc',
        label: 'Mã nhập học',
      }),
      new ColumnSchema({
        field: 'ho',
        label: 'Họ',
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên',

      }),
      new ColumnSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
      }),
      new ColumnSchema({
        field: 'gioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService
      }),
      new ColumnSchema({
        field: 'idNganhTrungTuyen',
        label: 'Ngành trúng tuyển',
        service: this._DM_NganhService,
      }),
      new ColumnSchema({
        field: 'tongDiem',
        label: 'Tổng điểm'
      }),
      new ColumnSchema({
        field: 'idHtTuyenSinh',
        label: 'Hình thức tuyển sinh',
        service: this._DM_HtTuyenSinhService,

      }),
      new ColumnSchema({
        field: 'idDotNhapHoc',
        label: 'Đợt nhập học',
        service: this._dm_DotNhapHocService,
      }),
      new ColumnSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService,

      }),
      new ColumnSchema({
        field: 'soQD',
        label: 'Số quyết định'
      }),
      new ColumnSchema({
        field: 'maSV',
        label: 'Mã sinh viên',
      }),

    ];
    super.ngOnInit();
  }
}
