import { TitleCasePipe } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListBase } from 'src/app/shared/base-class/list-base';
import { DataType, FormState, HeightType, Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ColumnSchema, CrudFormData, DialogModel, PopupSize, TitleSchema } from 'src/app/shared/models/schema';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DataSourceTrangThaiHoSo } from '../../danhsachtrungtuyen/models/const';
import { DanhSachTrungTuyenService } from '../../danhsachtrungtuyen/services/danhsachtrungtuyen.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_DoiTuongTuyenSinhService } from '../../dm-doituongtuyensinh/services/dm-doituongtuyensinh.service';
import { DM_GioiTinhService } from '../../dm-gioitinh/services/dm-gioitinh.service';
import { DM_HtTuyenSinhService } from '../../dm-httuyensinh/services/dm-httuyensinh.service';
import { DM_TrangThaiNguoiHocService } from '../../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
@Component({
  selector: 'thongke-nhaphoc-xemchitiet',
  templateUrl: './thongke-nhaphoc-xemchitiet.component.html',
  styleUrls: ['./thongke-nhaphoc-xemchitiet.component.scss']
})
export class ThongKe_NhapHoc_XemChiTietComponent extends ListBase implements OnInit {
  @Input() lstIdNguoiHoc: string[];
  constructor(
    injector: Injector,
    private _danhSachTrungTuyenService: DanhSachTrungTuyenService,
    private _dm_HtTuyenSinhhService: DM_HtTuyenSinhService,
    private _dm_doiTuongTuyenSinhService: DM_DoiTuongTuyenSinhService,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _dm_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._danhSachTrungTuyenService;
    // this.setting.hiddenPageTitle = true;
    this.setting.hiddenAdd = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.hiddenFunctionColumn = true;
    this.setting.heightType = HeightType.custom;
    this.setting.cols = [
      new ColumnSchema({
        field: 'maNhapHoc',
        label: 'Mã nhập học',
      }),
      new ColumnSchema({
        field: 'hoVaTen',
        label: 'Họ và tên',
      }),
      new ColumnSchema({
        field: 'idNganhDangKy',
        label: 'Ngành đăng ký',
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: (item) => `${item.soCTDT} - ${item.ten}`,
      }),
      new ColumnSchema({
        field: 'idNganhTrungTuyen',
        label: 'Ngành trúng tuyển',
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: (item) => `${item.soCTDT} - ${item.ten}`,
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
        field: 'idHtTuyenSinh',
        label: 'Hình thức tuyển sinh',
        service: this._dm_HtTuyenSinhhService
      }),
      new ColumnSchema({
        field: 'idDoiTuongTuyenSinh',
        label: 'Đối tượng tuyển sinh',
        service: this._dm_doiTuongTuyenSinhService
      }),
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên'
      }),
      new ColumnSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThaiHoSo,
      }),

    ];
    super.ngOnInit();
  }
  override async modifyGridInfo(gridInfo: GridInfo): Promise<boolean | void> {
    if (!this.lstIdNguoiHoc || !this.lstIdNguoiHoc.length) return false;
    gridInfo.filters.push(this.newFilter('_id', Operator.in, this.lstIdNguoiHoc));
  }
}
