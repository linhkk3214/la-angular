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
    this.setting.service = this._DanhSachQuyetDinhKhenThuongService;
    this.setting.hiddenFunctionColumn = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.hiddenAdd = true
    this.setting.cols = [
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
        // sort: false,
        // allowFilter: false
      }),
      new ColumnSchema({
        field: 'idNguoiHoc',
        label: 'Họ tên',
        service: this._dm_HoSoNguoiHocService,
        fieldPlus: 'masv, idLopHanhChinh, idKhoa',
        displayField: 'hoVaTen',
        funcSetValueRow: (rowItem, data) => {
          rowItem.maSv = data.masv;
          rowItem.idLopHanhChinh = data.idLopHanhChinh;
          rowItem.idKhoa = data.idKhoa;
        },
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',//Chưa xử lý lấy tên lớp hành chính
      }),
      new ColumnSchema({
        field: 'idKhoa',
        label: 'Khoa/Viện',
      }),
      new ColumnSchema({
        field: 'quyetDinhKhenThuongs',
        label: 'Loại khen thưởng',
        //multiple: true,
        // service: this._DanhSachLoaiKhenThuongService,
        dataType: 'quyetDinhKhenThuongs',
      }),
      new ColumnSchema({
        field: 'soQd',
        label: 'Số quyết định',
        dataType: 'soQd',
      }),
      new ColumnSchema({
        field: 'ngayQd',
        label: 'Ngày quyết định',
        dataType: 'ngayQd',
      }),
      new ColumnSchema({
        field: 'soTien',
        label: 'Số tiền',
        dataType: 'soTien',//Không khai báo được kiểu int
      }),
    ];
    super.ngOnInit();
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    this.defaultSettings = this.getDefaultSetting();
    let coValueNamHoc = this.defaultSettings.idNamHoc
    return this._DanhSachQuyetDinhKhenThuongService.thongKe(coValueNamHoc);
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    const lstIdLoaiKhenThuong = [];
    datasource.forEach(item => {
      item.quyetDinhKhenThuongs.forEach(qd => {
        if (lstIdLoaiKhenThuong.indexOf(qd.idLoaiKhenThuong) == -1) {
          lstIdLoaiKhenThuong.push(qd.idLoaiKhenThuong);
        }
      });
    });

    const lstLoaiKhenThuong = (await this._DanhSachLoaiKhenThuongService.getAllByFilter([
      this.newFilter('_id', Operator.in, lstIdLoaiKhenThuong)
    ])).data;

    datasource.forEach(item => {
      item.quyetDinhKhenThuongs.forEach(qd => {
        const itemLoaiKhenThuong = lstLoaiKhenThuong.find(q => q._id == qd.idLoaiKhenThuong);
        // const itemLoaiKhenThuong = lstLoaiKhenThuong.find(q => q._id == qd.idLoaiKhenThuong);
        qd.loaiKhenThuong = itemLoaiKhenThuong.ten;
        qd.soTien = itemLoaiKhenThuong.soTien;

      });
    });
  }

  handleClick(rowData) {
    alert('clicked');
    console.log(rowData);
  }
}
