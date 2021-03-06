import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListBase } from 'src/app/shared/base-class/list-base';
import { DataType, FormState, Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ColumnSchema, CrudFormData, DialogModel, PopupSize } from 'src/app/shared/models/schema';
import { DanhSachLoaiKhenThuongService } from '../../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { EnumTrangThaiQuyetDinh } from '../../danhsachquyetdinhhoctap/models/enums';
import { DanhSachQuyetDinhKhenThuongService } from '../../danhsachquyetdinhkhenthuong/services/danhsachquyetdinhkhenthuong.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_HocKyService } from '../../dm-hocky/services/dm-hocky.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { HoSoCanBoService } from '../../user/services/hosocanbo';
import { HoSoNguoiHocService } from '../services/hosonguoihoc.service';
@Component({
  selector: 'hosonguoihoc-khenthuong',
  templateUrl: './hosonguoihoc-khenthuong.component.html',
  styleUrls: ['./hosonguoihoc-khenthuong.component.scss']
})
export class HoSoNguoiHoc_KhenThuongComponent extends ListBase implements OnInit {
  @Input() idNguoiHoc: string;
  quyetDinhModel = new DialogModel({
    header: 'Xem quyết định',
    popupSize: new PopupSize({
      maximize: true
    })
  })
  constructor(
    injector: Injector,
    private _DanhSachQuyetDinhKhenThuongService: DanhSachQuyetDinhKhenThuongService,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'khen thưởng';
    this.setting.service = this._DanhSachQuyetDinhKhenThuongService;
    // this.setting.hiddenPageTitle = true;
    this.setting.hiddenAdd = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'soQd',
        label: 'Số quyết định',
      }),
      new ColumnSchema({
        field: 'ngayQd',
        label: 'Ngày quyết định',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        service: this._dm_NamHocService,
      }),
      new ColumnSchema({
        field: 'idHocKy',
        label: 'Học kỳ',
        service: this._dm_HocKyService,
      }),
      new ColumnSchema({
        field: 'idLoaiKhenThuong',
        label: 'Loại khen thưởng',
        fieldPlus: 'soTien',
        service: this._DanhSachLoaiKhenThuongService,
        funcSetValueRow: (rowItem, data) => {
          rowItem.soTien = data.soTien;
        }
      }),
      new ColumnSchema({
        field: 'soTien',
        label: 'Số tiền',
        dataType: 'int'
      }),
      new ColumnSchema({
        field: 'idNguoiKy',
        label: 'Người ký',
        service: this._HoSoCanBoService,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      })
    ];
    super.ngOnInit();
  }

  override async modifyGridInfo(gridInfo: GridInfo): Promise<boolean | void> {
    gridInfo.filters.push(
      this.newFilter('lstIdNguoiHoc', Operator.in, this.idNguoiHoc),
      this.newFilter('idTrangThai', Operator.in, EnumTrangThaiQuyetDinh.DA_DUYET)
    );
  }

  viewQuyetDinh(rowData) {
    this.quyetDinhModel.data.formModel = new CrudFormData();
    this.quyetDinhModel.data.formModel.formState = FormState.VIEW;
    this.quyetDinhModel.data.formModel.data = { _id: rowData._id };
    this.quyetDinhModel.showEditForm = true;
  }

}
