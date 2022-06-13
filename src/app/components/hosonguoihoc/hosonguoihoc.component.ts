import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, TabViewData } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { HoSoNguoiHocService } from './services/hosonguoihoc.service';
import { DataType, Operator } from 'src/app/shared/models/enums';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { DataSourceTrangThaiHoSo } from './models/const';
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
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { DM_TrangThaiNguoiHocService } from '../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { ReligionService } from '../user/services/religion.service';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
@Component({
  selector: 'hosonguoihoc',
  templateUrl: './hosonguoihoc.component.html',
  styleUrls: ['./hosonguoihoc.component.scss']
})
export class HoSoNguoiHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_DotNhapHocService: DotNhapHocService,
    private _dm_QuocTichService: QuocTichService,
    private _dm_DanTocService: DanTocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _dm_TonGiaoService: ReligionService,
    private _addressService: AddressService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _DM_NganhService: DM_NganhService,
    private _DM_KhuVucService: DM_KhuVucService,
    private _DM_HtTuyenSinhService: DM_HtTuyenSinhService,
    private _DM_DoiTuongTuyenSinhService: DM_DoiTuongTuyenSinhService,
    private _DM_DoiTuongUuTienService: DM_DoiTuongUuTienService,
    private _DM_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
    private _DM_HocLucService: DM_HocLucService,
    private _DM_HanhKiemService: DM_HanhKiemService,
    private _DM_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService,
    private _DM_KhoaVienService: DM_KhoaVienService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _DM_HeDaoTaoService: DM_HeDaoTaoService,
    private _DM_KhoaHocService: DM_KhoaHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'hồ sơ người học';
    this.setting.service = this._HoSoNguoiHocService;
    this.setting.popupSize.maximize = true;
    this.setting.cols = [
      new ColumnSchema({
        field: 'masv',
        label: 'Mã sinh viên',


      }),
      new ColumnSchema({
        field: 'hoVaTen',
        label: 'Họ và tên',
        width: '150px'
      }),
      new ColumnSchema({
        field: 'NgaySinh',
        label: 'Ngày sinh',

        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'GioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
      }),
      new ColumnSchema({
        field: 'idHe',
        label: 'Hệ',
        service: this._DM_HeDaoTaoService,
      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._DM_KhoaHocService,
      }),
      new ColumnSchema({
        field: 'idKhoa',
        label: 'Khoa/Viện',
        service: this._DM_KhoaVienService,
      }),
      new ColumnSchema({
        field: 'idNganh',
        label: 'Ngành',
        service: this._dm_CTĐTService,
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        service: this._DanhSachLopHanhChinhService,
      }),
      new ColumnSchema({
        field: 'idTrangThai',
        label: 'Trạng thái',
        service: this._DM_TrangThaiNguoiHocService,
      }),
      new ColumnSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService
      }),
      new ColumnSchema({
        field: 'GhiChu',
        label: 'Ghi chú',

      })
    ];
    super.ngOnInit();
  }
}
