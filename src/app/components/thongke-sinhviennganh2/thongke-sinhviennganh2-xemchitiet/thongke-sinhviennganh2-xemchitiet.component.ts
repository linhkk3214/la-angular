import { TitleCasePipe } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListBase } from 'src/app/shared/base-class/list-base';
import { DataType, FormState, HeightType, Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ColumnSchema, CrudFormData, DialogModel, PopupSize, TitleSchema } from 'src/app/shared/models/schema';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_GioiTinhService } from '../../dm-gioitinh/services/dm-gioitinh.service';
import { DM_TrangThaiNguoiHocService } from '../../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
import { EnumTypeGetData } from '../models/enums';
@Component({
  selector: 'thongke-sinhviennganh2-xemchitiet',
  templateUrl: './thongke-sinhviennganh2-xemchitiet.component.html',
  styleUrls: ['./thongke-sinhviennganh2-xemchitiet.component.scss']
})
export class ThongKe_SinhVienNganh2_XemChiTietComponent extends ListBase implements OnInit {
  @Input() lstIdNguoiHoc: string[];
  constructor(
    injector: Injector,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _dm_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'thông tin tuyển sinh';
    this.setting.service = this._hoSoNguoiHocService;
    // this.setting.hiddenPageTitle = true;
    this.setting.hiddenAdd = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.heightType = HeightType.custom;
    this.setting.cols = [
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
      }),
      new ColumnSchema({
        field: 'hoVaTen',
        label: 'Họ và tên',
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        service: this._danhSachLopHanhChinhService
      }),
      new ColumnSchema({
        field: 'idNganh',
        label: 'Ngành',
        service: this._dm_ChuongTrinhDaoTaoService
      }),
      new ColumnSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'gioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService

      }),
      new ColumnSchema({
        field: 'idTrangThai',
        label: 'Trạng thái',
        service: this._dm_TrangThaiNguoiHocService
      }),

    ];
    super.ngOnInit();
  }
  override async modifyGridInfo(gridInfo: GridInfo): Promise<boolean | void> {
    if (!this.lstIdNguoiHoc || !this.lstIdNguoiHoc.length) return false;
    gridInfo.filters.push(this.newFilter('_id', Operator.in, this.lstIdNguoiHoc));
  }
}
