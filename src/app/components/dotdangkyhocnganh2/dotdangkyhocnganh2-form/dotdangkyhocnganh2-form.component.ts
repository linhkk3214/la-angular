import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, TitleSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_HocKyService } from '../../dm-hocky/services/dm-hocky.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DataSourceTrangThai } from '../../dotnhaphoc/models/const';
import { DotDangKyHocNganh2Service } from '../services/dotdangkyhocnganh2.service';

@Component({
  selector: 'dotdangkyhocnganh2-form',
  templateUrl: './dotdangkyhocnganh2-form.component.html',
  styleUrls: ['./dotdangkyhocnganh2-form.component.scss']
})
export class DotDangKyHocNganh2FormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
  constructor(
    injector: Injector,
    private _DotDangKyHocNganh2Service: DotDangKyHocNganh2Service,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NganhService: DM_NganhService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DotDangKyHocNganh2Service;
    this.defaultSetting = this.getDefaultSetting();
    this.setting.schema = [
      new TitleSchema({
        field: 'abc',
        text: 'THÔNG TIN ĐỢT',
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên đợt',
        required: true,
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        service: this._dm_NamHocService,
        required: true,
        sortField: 'nam',
        sortDir: -1,
      }),
      new DropdownControlSchema({
        field: 'idHocKy',
        label: 'Học kỳ',
        required: true,
        service: this._dm_HocKyService,
        defaultFilters: [
          this.newFilter('idHeDaoTao', Operator.equal, this.defaultSetting.idHeDaoTao)
        ],
        bindingFilters: [
          this.newBindingFilter('idNamHoc', Operator.equal, 'idNamHoc')
        ],
      }),
      new DateTimeControlSchema({
        field: 'ngayBatDau',
        label: 'Ngày bắt đầu',
        required: true,
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'ngayKetThuc',
        label: 'Ngày kết thúc',
        required: true,
        width: 6
      }),
      new MaskControlSchema({
        field: 'soNgayXacNhan',
        label: 'Số ngày xác nhận',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThai,
        required: true,
        width: 6
      }),
      new TitleSchema({
        field: 'abc',
        text: 'PHẠM VI',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idNganh',
        label: 'Ngành',
        service: this._dm_CTĐTService,
        multiple: true,
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
      }),
    ];
  }
}
