import { Component, Injector, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DanhMucHocBongService } from '../danhmuchocbong/services/danhmuchocbong.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DanhSachQuyetDinhHocBongService } from '../danhsachquyetdinhhocbong/services/danhsachquyetdinhhocbong.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
@Component({
  selector: 'quyetdinhhocbong-thongke',
  templateUrl: './quyetdinhhocbong-thongke.component.html',
  styleUrls: ['./quyetdinhhocbong-thongke.component.scss']
})
export class QuyetDinhHocBong_ThongKeComponent extends ListBase implements OnInit {
  defaultSettings: any = {};
  constructor(
    injector: Injector,
    private _DanhSachQuyetDinhHocBongService: DanhSachQuyetDinhHocBongService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _DanhMucHocBongService: DanhMucHocBongService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_KhoaVienService: DM_KhoaVienService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.title = 'Thống kê người học đạt học bổng tài trợ';
    this.setting.service = this._DanhSachQuyetDinhHocBongService;
    this.setting.hiddenFunctionColumn = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.hiddenAdd = true
    this.setting.cols = [
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
        sort: false,
        allowFilter: false
      }),
      new ColumnSchema({
        field: 'idNguoiHoc',
        label: 'Họ tên',
        order: 1,
        service: this._dm_HoSoNguoiHocService,
        fieldPlus: 'maSv,idLopHanhChinh,idKhoa',
        displayField: 'hoVaTen',
        funcSetValueRow: (rowItem, data) => {
          rowItem.maSv = data.maSv;
          rowItem.idLopHanhChinh = data.idLopHanhChinh;
          rowItem.idKhoa = data.idKhoa;
        },
        sort: false
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        order: 2,
        service: this._danhSachLopHanhChinhService,
        // allowFilter: false,
        sort: false,
      }),
      new ColumnSchema({
        field: 'idKhoa',
        label: 'Khoa/Viện',
        order: 3,
        service: this._dm_KhoaVienService,
        // allowFilter: false,
        sort: false
      }),
      new ColumnSchema({
        field: 'idHocBong',
        label: 'Học bổng',
        service: this._DanhMucHocBongService,
      }),
      new ColumnSchema({
        field: 'soQuyetDinh',
        label: 'Số quyết định',
      }),
      new ColumnSchema({
        field: 'ngayQuyetDinh',
        label: 'Ngày quyết định',
        dataType: 'date',
      }),
      new ColumnSchema({
        field: 'soTien',
        label: 'Số tiền',
        dataType: 'int',
        allowFilter: false,
        sort: false,
      }),
    ];
    super.ngOnInit();
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    this.defaultSettings = this.getDefaultSetting();
    let idNamHoc = this.defaultSettings.idNamHoc;
    return this._DanhSachQuyetDinhHocBongService.thongKe(idNamHoc, gridInfo);
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    const lstIdHocBong = [];
    datasource.forEach(item => {
      if (lstIdHocBong.indexOf(item.idHocBong) == -1) {
        lstIdHocBong.push(item.idHocBong);
      }
    });

    const lstHocBong = (await this._DanhMucHocBongService.getAllByFilter([
      this.newFilter('_id', Operator.in, lstIdHocBong)
    ])).data;

    datasource.forEach(item => {
      const itemHocBong = lstHocBong.find(q => q._id == item.idHocBong);
      item.soTien = itemHocBong.soTienMoiSuat;
    });
  }
}
