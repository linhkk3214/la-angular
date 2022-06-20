import { Component, Injector, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DanhSachLoaiKhenThuongService } from '../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DanhSachQuyetDinhKhenThuongService } from '../danhsachquyetdinhkhenthuong/services/danhsachquyetdinhkhenthuong.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
@Component({
  selector: 'quyetdinhkhenthuong-thongke',
  templateUrl: './quyetdinhkhenthuong-thongke.component.html',
  styleUrls: ['./quyetdinhkhenthuong-thongke.component.scss']
})
export class QuyetDinhKhenThuong_ThongKeComponent extends ListBase implements OnInit {
  defaultSettings: any = {};
  constructor(
    injector: Injector,
    private _DanhSachQuyetDinhKhenThuongService: DanhSachQuyetDinhKhenThuongService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_KhoaVienService: DM_KhoaVienService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'người học khen thưởng';
    this.setting.title = 'Thống kê người học khen thưởng';
    this.setting.service = this._DanhSachQuyetDinhKhenThuongService;
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
        field: 'idLoaiKhenThuong',
        label: 'Loại khen thưởng',
        service: this._DanhSachLoaiKhenThuongService,
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
    return this._DanhSachQuyetDinhKhenThuongService.thongKe(idNamHoc, gridInfo);
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    const lstIdLoaiKhenThuong = [];
    datasource.forEach(item => {
      if (lstIdLoaiKhenThuong.indexOf(item.idLoaiKhenThuong) == -1) {
        lstIdLoaiKhenThuong.push(item.idLoaiKhenThuong);
      }
    });

    const lstLoaiKhenThuong = (await this._DanhSachLoaiKhenThuongService.getAllByFilter([
      this.newFilter('_id', Operator.in, lstIdLoaiKhenThuong)
    ])).data;

    datasource.forEach(item => {
      const itemLoaiKhenThuong = lstLoaiKhenThuong.find(q => q._id == item.idLoaiKhenThuong);
      item.soTien = itemLoaiKhenThuong.soTien;
    });
  }
}
