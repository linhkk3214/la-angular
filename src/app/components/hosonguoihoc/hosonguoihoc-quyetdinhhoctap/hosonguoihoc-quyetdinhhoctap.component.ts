import { TitleCasePipe } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListBase } from 'src/app/shared/base-class/list-base';
import { DataType, FormState, Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ColumnSchema, CrudFormData, DialogModel, PopupSize, TitleSchema } from 'src/app/shared/models/schema';
import { DanhSachLoaiQuyetDinhService } from '../../danhsachloaiquyetdinh/services/danhsachloaiquyetdinh.service';
import { DanhSachQuyetDinhHocTapService } from '../../danhsachquyetdinhhoctap/services/danhsachquyetdinhhoctap.service';
import { DanhSachTrungTuyenService } from '../../danhsachtrungtuyen/services/danhsachtrungtuyen.service';
import { DM_HocKyService } from '../../dm-hocky/services/dm-hocky.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { HoSoCanBoService } from '../../user/services/hosocanbo';
@Component({
  selector: 'hosonguoihoc-quyetdinhhoctap',
  templateUrl: './hosonguoihoc-quyetdinhhoctap.component.html',
  styleUrls: ['./hosonguoihoc-quyetdinhhoctap.component.scss']
})
export class HoSoNguoiHoc_QuyetDinhHocTapComponent extends ListBase implements OnInit {
  @Input() idNguoiHoc: string;
  quyetDinhModel = new DialogModel({
    header: 'Xem quyết định',
    popupSize: new PopupSize({
      maximize: true
    })
  })
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocTapService: DanhSachQuyetDinhHocTapService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _danhMucLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _hoSoCanBoServie: HoSoCanBoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'thông tin tuyển sinh';
    this.setting.service = this._danhSachQuyetDinhHocTapService;
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
        field: 'ngayBanHanh',
        label: 'Ngày ban hành',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'ngayHieuLuc',
        label: 'Ngày hiệu lực',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        service: this._dm_NamHocService
      }),
      new ColumnSchema({
        field: 'idHocKy',
        label: 'Học kỳ',
        service: this._dm_HocKyService
      }),
      new ColumnSchema({
        field: 'idLoaiQuyetDinh',
        label: 'Loại quyết định',
        service: this._danhMucLoaiQuyetDinhService,
        fieldPlus: 'soTienMoiSuat',
        funcSetValueRow: (rowItem, data) => {
          rowItem.soTienMoiSuat = data.soTienMoiSuat;
        }
      }),
      new ColumnSchema({
        field: 'idNguoiKy',
        label: 'Người ký',
        service: this._hoSoCanBoServie,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      }),

    ];
    super.ngOnInit();
  }

  override async modifyGridInfo(gridInfo: GridInfo): Promise<boolean | void> {
    gridInfo.filters.push(
      this.newFilter('lstIdNguoiHoc', Operator.in, this.idNguoiHoc)
    );
  }
  viewQuyetDinh(rowData) {
    this.quyetDinhModel.data.formModel = new CrudFormData();
    this.quyetDinhModel.data.formModel.formState = FormState.VIEW;
    this.quyetDinhModel.data.formModel.data = { _id: rowData._id };
    this.quyetDinhModel.showEditForm = true;
  }
}
