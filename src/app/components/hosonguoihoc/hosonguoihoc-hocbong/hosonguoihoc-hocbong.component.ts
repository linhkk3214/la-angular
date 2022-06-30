import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListBase } from 'src/app/shared/base-class/list-base';
import { DataType, FormState, Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ColumnSchema, CrudFormData, DialogModel, PopupSize } from 'src/app/shared/models/schema';
import { DanhMucHocBongService } from '../../danhmuchocbong/services/danhmuchocbong.service';
import { DanhSachQuyetDinhHocBongService } from '../../danhsachquyetdinhhocbong/services/danhsachquyetdinhhocbong.service';
import { EnumTrangThaiQuyetDinh } from '../../danhsachquyetdinhhoctap/models/enums';
import { DM_HocKyService } from '../../dm-hocky/services/dm-hocky.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
@Component({
  selector: 'hosonguoihoc-hocbong',
  templateUrl: './hosonguoihoc-hocbong.component.html',
  styleUrls: ['./hosonguoihoc-hocbong.component.scss']
})
export class HoSoNguoiHoc_HocBongComponent extends ListBase implements OnInit {
  @Input() idNguoiHoc: string;
  quyetDinhModel = new DialogModel({
    header: 'Xem quyết định',
    popupSize: new PopupSize({
      maximize: true
    })
  })
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocBongService: DanhSachQuyetDinhHocBongService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _danhMucHocBongService: DanhMucHocBongService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'học bổng';
    this.setting.service = this._danhSachQuyetDinhHocBongService;
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
        service: this._dm_NamHocService
      }),
      new ColumnSchema({
        field: 'idHocKy',
        label: 'Học kỳ',
        service: this._dm_HocKyService
      }),
      new ColumnSchema({
        field: 'idHocBong',
        label: 'Loại học bổng',
        service: this._danhMucHocBongService,
        fieldPlus: 'soTienMoiSuat',
        funcSetValueRow: (rowItem, data) => {
          rowItem.soTienMoiSuat = data.soTienMoiSuat;
        }
      }),
      new ColumnSchema({
        field: 'soTienMoiSuat',
        label: 'Số tiền',
        dataType: 'int'
      }),

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

