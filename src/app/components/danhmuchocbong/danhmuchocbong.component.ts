import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhMucHocBongService } from './services/danhmuchocbong.service';
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
import { DanhMucDonViTaiTroService } from '../danhmucdonvitaitro/services/danhmucdonvitaitro.service';
@Component({
  selector: 'danhmuchocbong',
  templateUrl: './danhmuchocbong.component.html',
  styleUrls: ['./danhmuchocbong.component.scss']
})
export class DanhMucHocBongComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _danhMucHocBongService: DanhMucHocBongService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _danhMucDonviTaiTroService: DanhMucDonViTaiTroService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'học bổng';
    this.setting.service = this._danhMucHocBongService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 500;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên',
      }),
      new ColumnSchema({
        field: 'idDonViTaiTro',
        label: 'Đơn vị tài trợ',
        required: true,
        service: this._danhMucDonviTaiTroService,
      }),
      new ColumnSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        required: true,
        service: this._dm_NamHocService,
      }),
      new ColumnSchema({
        field: 'idHocKy',
        label: 'Học kỳ',
        required: true,
        service: this._dm_HocKyService,
      }),
      new ColumnSchema({
        field: 'soSuat',
        label: 'Số suất',
      }),
      new ColumnSchema({
        field: 'soTienMoiSuat',
        label: 'Số tiền mỗi suất',
        dataType: 'int'
      }),
    ];
    super.ngOnInit();
  }
}
