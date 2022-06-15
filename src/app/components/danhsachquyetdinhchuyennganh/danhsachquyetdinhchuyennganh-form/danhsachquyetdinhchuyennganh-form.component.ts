import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, FileControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_HocKyService } from '../../dm-hocky/services/dm-hocky.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
import { HoSoCanBoService } from '../../user/services/hosocanbo';
import { DanhSachQuyetDinhChuyenNganhService } from '../services/danhsachquyetdinhchuyennganh.service';

@Component({
  selector: 'danhsachquyetdinhchuyennganh-form',
  templateUrl: './danhsachquyetdinhchuyennganh-form.component.html',
  styleUrls: ['./danhsachquyetdinhchuyennganh-form.component.scss']
})
export class DanhSachQuyetDinhChuyenNganhFormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
  constructor(
    injector: Injector,
    private _DanhSachQuyetDinhChuyenNganhService: DanhSachQuyetDinhChuyenNganhService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DanhSachQuyetDinhChuyenNganhService;
    // Lấy setting mặc định được cấu hình
    this.defaultSetting = this.getDefaultSetting();
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        required: true,
        service: this._dm_KhoaHocService,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idNganhHienTai',
        label: 'Từ ngành',
        required: true,
        service: this._dm_CTĐTService,
        bindingFilters: [
          this.newBindingFilter('idKhoaHoc', Operator.equal, 'idKhoaHoc')
        ],
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'lstIdNguoiHoc',
        label: 'Người học',
        required: true,
        service: this._dm_HoSoNguoiHocService,
        bindingFilters: isNotFormAdd ? null : [
          this.newBindingFilter('idNganh', Operator.equal, 'idNganhHienTai')
        ],
        fieldPlus: 'masv',
        funcGetLabel: item => {
          return `${item.masv} - ${item.hoVaTen}`;
        },
        multiple: true,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idNganhChuyen',
        label: 'Sang ngành',
        required: true,
        service: this._dm_CTĐTService,
        bindingFilters: [
          this.newBindingFilter('idKhoaHoc', Operator.equal, 'idKhoaHoc')
        ],
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idLopChuyen',
        label: 'Sang lớp',
        required: true,
        service: this._DanhSachLopHanhChinhService,
        bindingFilters: [
          this.newBindingFilter('idChuongTrinhDaoTao', Operator.equal, 'idNganhChuyen')
        ],
        disabled: isNotFormAdd,
      }),
      new DropdownControlSchema({
        field: 'idNamHocAd',
        label: 'Năm học áp dụng',
        required: true,
        service: this._dm_NamHocService,
        sortField: 'nam',
        sortDir: -1,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idHocKyAd',
        label: 'Học kỳ áp dụng',
        required: true,
        service: this._dm_HocKyService,
        defaultFilters: [
          this.newFilter('idHeDaoTao', Operator.equal, this.defaultSetting.idHeDaoTao)
        ],
        bindingFilters: [
          this.newBindingFilter('idNamHoc', Operator.equal, 'idNamHocAd')
        ],
        disabled: isNotFormAdd,
      }),
      new TextControlSchema({
        field: 'soQd',
        label: 'Số quyết định',
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'ngayQd',
        label: 'Ngày quyết định',
        width: 6
      }),
      new DropdownControlSchema({
        field: 'idNguoiKy',
        label: 'Người ký',
        service: this._HoSoCanBoService,
        fieldPlus: 'ma',
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      }),
      new TextAreaControlSchema({
        field: 'noiDung',
        label: 'Nội dung',
        width: 12
      }),
      new FileControlSchema({
        field: 'lstDinhKem',
        label: 'Đính kèm'
      }),
    ];
  }
}
