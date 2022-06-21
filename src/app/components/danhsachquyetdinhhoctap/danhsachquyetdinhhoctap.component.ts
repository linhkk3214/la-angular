import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachQuyetDinhHocTapService } from './services/danhsachquyetdinhhoctap.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoCanBoService } from '../user/services/hosocanbo';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_NganhService } from '../dm-nganh/services/dm-nganh.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
import { DM_HocKyService } from '../dm-hocky/services/dm-hocky.service';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';
import { DataType } from 'src/app/shared/models/enums';
import { DanhSachLoaiKhenThuongService } from '../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhSachLoaiQuyetDinhService } from '../danhsachloaiquyetdinh/services/danhsachloaiquyetdinh.service';
@Component({
  selector: 'DanhSachQuyetDinhHocTap',
  templateUrl: './danhsachquyetdinhhoctap.component.html',
  styleUrls: ['./danhsachquyetdinhhoctap.component.scss']
})
export class DanhSachQuyetDinhHocTapComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocTapService: DanhSachQuyetDinhHocTapService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
    private _danhSachLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'quyết định học tập';
    this.setting.service = this._danhSachQuyetDinhHocTapService;
    this.setting.popupSize.width = 1300;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'soQd',
        label: 'Số quyết định',
      }),
      new ColumnSchema({
        field: 'ngayBanHanh',
        label: 'Ngày ban hành',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'idLoaiQuyetDinh',
        label: 'Loại quyết định',
        service: this._danhSachLoaiQuyetDinhService,
      }),
      new ColumnSchema({
        field: 'idNguoiKy',
        label: 'Người ký',
        service: this._HoSoCanBoService,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      }),
      new ColumnSchema({
        field: 'ngayHieuLuc',
        label: 'Ngày hiệu lực',
        dataType: DataType.date
      }),
    ];
    super.ngOnInit();
  }
}
