import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachQuyetDinhChuyenNganhService } from './services/danhsachquyetdinhchuyennganh.service';
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
@Component({
  selector: 'danhsachquyetdinhchuyennganh',
  templateUrl: './danhsachquyetdinhchuyennganh.component.html',
  styleUrls: ['./danhsachquyetdinhchuyennganh.component.scss']
})
export class DanhSachQuyetDinhChuyenNganhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachQuyetDinhChuyenNganhService: DanhSachQuyetDinhChuyenNganhService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
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
    this.setting.objectName = 'quyết định chuyển ngành';
    this.setting.service = this._DanhSachQuyetDinhChuyenNganhService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'idNganhHienTai',
        label: 'Từ ngành',
        required: true,
        service: this._dm_CTĐTService,
      }),
      new ColumnSchema({
        field: 'idNganhChuyen',
        label: 'Sang ngành',
        required: true,
        service: this._dm_CTĐTService,
      }),
      new ColumnSchema({
        field: 'idLopChuyen',
        label: 'Sang lớp',
        required: true,
        service: this._DanhSachLopHanhChinhService,
      }),
      new ColumnSchema({
        field: 'idNamHocAd',
        label: 'Năm học áp dụng',
        required: true,
        service: this._dm_NamHocService,
      }),
      new ColumnSchema({
        field: 'idHocKyAd',
        label: 'Học kỳ áp dụng',
        required: true,
        service: this._dm_HocKyService,
      }),
      new ColumnSchema({
        field: 'soQd',
        label: 'Số quyết định',
      }),
      new ColumnSchema({
        field: 'ngayQd',
        label: 'Ngày quyết định',
        dataType: DataType.date
      }),
    ];
    super.ngOnInit();
  }
}
