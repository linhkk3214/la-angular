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
    this.setting.widthFunctionColumn = '10rem'; // Điều chỉnh lại kích thước cột chức năng vì thêm nút mới
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
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
        service: this._dm_HoSoNguoiHocService,
        fieldPlus: 'masv, idLopHanhChinh, idKhoa',
        displayField: 'hoVaTen',
        funcSetValueRow: (rowItem, data) => {
          rowItem.maSv = data.masv;
          rowItem.idLopHanhChinh = data.idLopHanhChinh;
          rowItem.idKhoa = data.idKhoa;
        }
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        service: this._danhSachLopHanhChinhService,
        displayField: 'ten',
      }),
      new ColumnSchema({
        field: 'idKhoa',
        label: 'Khoa/Viện',
        service: this._dm_KhoaVienService
      }),
      new ColumnSchema({
        field: 'quyetDinhKhenThuongs',
        label: 'Loại khen thưởng',
        //multiple: true,
        // service: this._DanhSachLoaiKhenThuongService,
        dataType: 'quyetDinhKhenThuongs',
        fieldPlus: 'soTien',
        funcSetValueRow: (rowItem, data) => {
          rowItem.soTien = data.soTien;
        }
      }),
      new ColumnSchema({
        field: 'soTien',
        label: 'Số tiền',
        dataType: 'int'
      }),
    ];
    super.ngOnInit();
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    return this._DanhSachQuyetDinhKhenThuongService.thongKe('629ac72c9a1bc7aaf7bdd93b');
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
        qd.loaiKhenThuong = itemLoaiKhenThuong.ten;
      });
    });
  }

  handleClick(rowData) {
    alert('clicked');
    console.log(rowData);
  }
}
