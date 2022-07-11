import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataType, FormState, HeightType, Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
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
  @Input() lstIdNguoiHoc: string[];
  @Input() viewNganh2 = false;
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
        label: 'Ngành chính',
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
    this.settingForCustomList();
    super.ngOnInit();
  }

  settingForCustomList() {
    if (this.lstIdNguoiHoc) {
      this.setting.hiddenFunctionColumn = true;
      this.setting.hiddenButtons = true;
      this.setting.hiddenPageTitle = true;
      this.setting.heightType = HeightType.custom;
    }
    if (this.viewNganh2) {
      const indexColNganh1 = this.setting.cols.findIndex(q => q.field == 'idNganh');
      this.setting.cols.splice(indexColNganh1 + 1, 0, new ColumnSchema({
        field: 'idNganh2',
        label: 'Ngành 2',
        service: this._dm_CTĐTService,
      }));
    }
  }

  override async modifyGridInfo(gridInfo: GridInfo): Promise<boolean | void> {
    if (this.lstIdNguoiHoc) {
      // Return false để khỏi phải gửi request lấy dữ liệu
      if (!this.lstIdNguoiHoc.length) return false;
      gridInfo.filters.push(this.newFilter('_id', Operator.in, this.lstIdNguoiHoc));
    }
  }

  viewKhenThuongKyLuat(rowData) {
    this.khenThuongKyLuatDialogModel.data.formModel = new CrudFormData();
    const formModel = this.khenThuongKyLuatDialogModel.data.formModel;
    formModel.formState = FormState.EDIT;
    formModel.data = { _id: rowData._id };
    this.khenThuongKyLuatDialogModel.showEditForm = true;
  }
}
