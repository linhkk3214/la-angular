import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DanhSachLoaiQuyetDinhService } from '../danhsachloaiquyetdinh/services/danhsachloaiquyetdinh.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { EnumTrangThaiQuyetDinh } from '../danhsachquyetdinhhoctap/models/enums';
import { DanhSachQuyetDinhHocTapService } from '../danhsachquyetdinhhoctap/services/danhsachquyetdinhhoctap.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
@Component({
  selector: 'quyetdinhhoctap-thongke',
  templateUrl: './quyetdinhhoctap-thongke.component.html',
  styleUrls: ['./quyetdinhhoctap-thongke.component.scss']
})
export class QuyetDinhHocTap_ThongKeComponent extends ListBase implements OnInit {
  @ViewChild('templateFilterSinhVien', { static: true }) templateFilterSinhVien: TemplateRef<any>;
  defaultSettings: any = {};
  constructor(
    injector: Injector,
    private _DanhSachQuyetDinhHocTapService: DanhSachQuyetDinhHocTapService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _DanhSachLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_KhoaVienService: DM_KhoaVienService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.title = 'Thống kê người học có quyết định học tập';
    this.setting.service = this._DanhSachQuyetDinhHocTapService;
    this.setting.hiddenFunctionColumn = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.hiddenAdd = true
    this.setting.cols = [
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
        sort: false
      }),
      new ColumnSchema({
        field: 'idNguoiHoc',
        label: 'Họ tên',
        order: 1,
        service: this._dm_HoSoNguoiHocService,
        fieldPlus: 'maSv,idLopHanhChinh,idKhoaVien',
        displayField: 'hoVaTen',
        funcSetValueRow: (rowItem, data) => {
          rowItem.maSv = data.maSv;
          rowItem.idLopHanhChinh = data.idLopHanhChinh;
          rowItem.idKhoaVien = data.idKhoaVien;
        },
        // Override filter mặc định của base thành filter theo templateFilterSinhVien
        // Mặc định là column này sẽ filter theo dạng dropdown
        templateFilter: this.templateFilterSinhVien,
        // Override lại field filter của base
        fieldFilter: 'hoVaTen',
        // Override lại operator filter của base
        operatorFilter: Operator.contain,
        sort: false,
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
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        order: 3,
        service: this._dm_KhoaVienService,
        // allowFilter: false,
        sort: false
      }),
      new ColumnSchema({
        field: 'idLoaiQuyetDinh',
        label: 'Loại quyết định',
        service: this._DanhSachLoaiQuyetDinhService,
      }),
      new ColumnSchema({
        field: 'soQuyetDinh',
        label: 'Số quyết định',
      }),
      new ColumnSchema({
        field: 'ngayQuyetDinh',
        label: 'Ngày quyết định',
        dataType: 'date',
      })
    ];
    super.ngOnInit();
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    this.defaultSettings = this.getDefaultSetting();
    let idNamHoc = this.defaultSettings.idNamHoc;
    return this._DanhSachQuyetDinhHocTapService.thongKe(idNamHoc, gridInfo);
  }
}
