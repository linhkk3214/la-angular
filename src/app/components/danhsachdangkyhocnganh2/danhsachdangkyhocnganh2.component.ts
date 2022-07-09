import { Component, Injector, OnInit } from '@angular/core';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { DotDangKyHocNganh2Service } from '../dotdangkyhocnganh2/services/dotdangkyhocnganh2.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
import { DataSourceTrangThaiNganh2 } from './models/const';
import { EnumTrangThaiNganh2 } from './models/enums';
import { DanhSachDangKyHocNganh2Service } from './services/danhsachdangkyhocnganh2.service';
@Component({
  selector: 'danhsachdangkyhocnganh2',
  templateUrl: './danhsachdangkyhocnganh2.component.html',
  styleUrls: ['./danhsachdangkyhocnganh2.component.scss']
})
export class DanhSachDangKyHocNganh2Component extends ListBase implements OnInit {
  enumTrangThaiNganh2 = EnumTrangThaiNganh2;
  constructor(
    injector: Injector,
    private _DanhSachDangKyHocNganh2Service: DanhSachDangKyHocNganh2Service,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
    private _dotDangKyHocNganh2Service: DotDangKyHocNganh2Service,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dmKhoaVienService: DM_KhoaVienService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'sinh viên đăng ký học ngành 2';
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 650;
    this.setting.widthFunctionColumn = '10.5rem'
    this.setting.service = this._DanhSachDangKyHocNganh2Service;
    this.setting.cols = [
      new ColumnSchema({
        field: 'idNguoiHoc',
        service: this._hoSoNguoiHocService,
        label: 'Sinh viên',
        funcGetLabel: item => {
          return `${item.hoVaTen} (${item.maSv})`;
        },
        fieldPlus: 'maSv, idKhoaVien, idNganh, idLopHanhChinh',
        order: 1,
        funcSetValueRow: (rowItem, data) => {
          rowItem.maSv = data.maSv;
          rowItem.idKhoaVien = data.idKhoaVien;
          rowItem.idNganhChinh = data.idNganh;
          rowItem.idLopHanhChinh = data.idLopHanhChinh;
        },
      }),
      new ColumnSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        order: 2,
        service: this._dmKhoaVienService,
      }),
      new ColumnSchema({
        field: 'idNganhChinh',
        label: 'Ngành chính',
        order: 3,
        service: this._dm_CTĐTService,
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        }
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        order: 4,
        service: this._danhSachLopHanhChinhService,
      }),
      new ColumnSchema({
        field: 'idNganhDangKy',
        label: 'Ngành 2',
        service: this._dm_CTĐTService,
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        }
      }),
      new ColumnSchema({
        field: 'idDotDangKy',
        label: 'Đợt đăng ký',
        service: this._dotDangKyHocNganh2Service,
      }),
      new ColumnSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThaiNganh2
      }),
    ];
    super.ngOnInit();
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    // Trước khi render ra datasource, cần modify nó để set ẩn hiện các nút sửa/xóa trong base
    datasource.forEach(rowData => {
      if (rowData.trangThai != EnumTrangThaiNganh2.CHO_DUYET) {
        rowData.hiddenEdit = true;
        rowData.hiddenDelete = true;
      }
      if (rowData.trangThai == EnumTrangThaiNganh2.CHO_DUYET) {
        rowData.hiddenEdit = true;
      }
    });
  }

  pheDuyetDangKy(rowData) {
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiNganh2.DA_DUYET, 'phê duyệt');
  }

  tuChoiDangKy(rowData) {
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiNganh2.TU_CHOI, 'từ chối');
  }

  private thayDoiTrangThai(id: string, trangThai: number, actionName: string) {
    this.confirm(`Bạn có chắc chắn muốn ${actionName} bản ghi`)
      .then(res => {
        if (!res) return;
        this._DanhSachDangKyHocNganh2Service.thayDoiTrangThai(id, trangThai)
          .then(res => {
            this.handleResponse(res, `${this.upperFirstLetter(actionName)} thành công`, f => {
              this._triggerProcessData();
            });
          });
      });
  }
}
