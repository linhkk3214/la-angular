import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachDangKyHocNganh2Service } from './services/danhsachdangkyhocnganh2.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';
import { DataType } from 'src/app/shared/models/enums';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';
import { DM_HocKyService } from '../dm-hocky/services/dm-hocky.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
import { DotDangKyHocNganh2Service } from '../dotdangkyhocnganh2/services/dotdangkyhocnganh2.service';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
@Component({
  selector: 'danhsachdangkyhocnganh2',
  templateUrl: './danhsachdangkyhocnganh2.component.html',
  styleUrls: ['./danhsachdangkyhocnganh2.component.scss']
})
export class DanhSachDangKyHocNganh2Component extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachDangKyHocNganh2Service: DanhSachDangKyHocNganh2Service,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
    private _dotDangKyHocNganh2Service: DotDangKyHocNganh2Service,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'sinh viên đăng ký học ngành 2';
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 650;
    this.setting.service = this._DanhSachDangKyHocNganh2Service;
    this.setting.cols = [
      new ColumnSchema({
        field: 'idNguoiHoc',
        service: this._hoSoNguoiHocService,
        label: 'Sinh viên',
        funcGetLabel: item => {
          return `${item.hoVaTen} (${item.maSv})`;
        },
        fieldPlus: 'maSv'

      }),
      new ColumnSchema({
        field: 'idNamHoc',
        label: 'Ngành chính',
      }),
      new ColumnSchema({
        field: 'idHocKy',
        label: 'Lớp hành chính',
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
        field: 'trangThai',
        label: 'Trạng thái',
        // dataSource: DataSourceTrangThai
      }),
    ];
    super.ngOnInit();
  }
}
