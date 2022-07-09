import { Component, Injector, OnInit } from '@angular/core';
import { DataType, FormState } from 'src/app/shared/models/enums';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema, CrudFormData, DialogModel, PopupSize } from '../../shared/models/schema';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_DoiTuongDaoTaoService } from '../dm-doituongdaotao/services/dm-doituongdaotao.service';
import { DM_GioiTinhService } from '../dm-gioitinh/services/dm-gioitinh.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { DM_TrangThaiNguoiHocService } from '../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { HoSoNguoiHocService } from './services/hosonguoihoc.service';
@Component({
  selector: 'hosonguoihoc',
  templateUrl: './hosonguoihoc.component.html',
  styleUrls: ['./hosonguoihoc.component.scss']
})
export class HoSoNguoiHocComponent extends ListBase implements OnInit {
  khenThuongKyLuatDialogModel = new DialogModel({
    header: 'Xem hồ sơ người học',
    popupSize: new PopupSize({
      maximize: true
    })
  })
  constructor(
    injector: Injector,
    private _HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _DM_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
    private _DM_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService,
    private _DM_KhoaVienService: DM_KhoaVienService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _DM_HeDaoTaoService: DM_HeDaoTaoService,
    private _DM_KhoaHocService: DM_KhoaHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'hồ sơ người học';
    this.setting.service = this._HoSoNguoiHocService;
    this.setting.widthFunctionColumn = '9.5rem';
    this.setting.popupSize.maximize = true;
    this.setting.cols = [
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
      }),
      new ColumnSchema({
        field: 'hoVaTen',
        label: 'Họ và tên',
        width: '150px',
      }),
      new ColumnSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'gioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
      }),
      new ColumnSchema({
        field: 'idHe',
        label: 'Hệ',
        service: this._DM_HeDaoTaoService,
      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._DM_KhoaHocService,
      }),
      new ColumnSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        service: this._DM_KhoaVienService,
      }),
      new ColumnSchema({
        field: 'idNganh',
        label: 'Ngành',
        service: this._dm_CTĐTService,
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        service: this._DanhSachLopHanhChinhService,
      }),
      new ColumnSchema({
        field: 'idTrangThai',
        label: 'Trạng thái',
        service: this._DM_TrangThaiNguoiHocService,
      }),
      new ColumnSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService
      }),

    ];
    super.ngOnInit();
  }

  viewKhenThuongKyLuat(rowData) {
    this.khenThuongKyLuatDialogModel.data.formModel = new CrudFormData();
    const formModel = this.khenThuongKyLuatDialogModel.data.formModel;
    formModel.formState = FormState.EDIT;
    formModel.data = { _id: rowData._id };
    this.khenThuongKyLuatDialogModel.showEditForm = true;
  }
}
