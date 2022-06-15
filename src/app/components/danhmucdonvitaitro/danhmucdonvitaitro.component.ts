import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhMucDonViTaiTroService } from './services/danhmucdonvitaitro.service';
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
import { DM_LoaiDonViTaiTroService } from '../dm-loaidonvitaitro/services/dm-loaidonvitaitro.service';
@Component({
  selector: 'danhmucdonvitaitro',
  templateUrl: './danhmucdonvitaitro.component.html',
  styleUrls: ['./danhmucdonvitaitro.component.scss']
})
export class DanhMucDonViTaiTroComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _danhMucDonViTaiTroService: DanhMucDonViTaiTroService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_LoaiDonViTaiTroService: DM_LoaiDonViTaiTroService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đơn vị tài trợ';
    this.setting.service = this._danhMucDonViTaiTroService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên đơn vị',
      }),
      new ColumnSchema({
        field: 'idLoaiDonVi',
        service: this._dm_LoaiDonViTaiTroService,
        label: 'Loại đơn vị',
      }),
      new ColumnSchema({
        field: 'diaChi',
        label: 'Địa chỉ',
      }),
      new ColumnSchema({
        field: 'nguoiDaiDien',
        label: 'Người đại diện'
      }),
    ];
    super.ngOnInit();
  }
}
