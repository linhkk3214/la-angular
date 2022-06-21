import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, FileControlSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhMucDonViTaiTroService } from '../../danhmucdonvitaitro/services/danhmucdonvitaitro.service';
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
import { DanhMucHocBongService } from '../services/danhmuchocbong.service';

@Component({
  selector: 'danhmuchocbong-form',
  templateUrl: './danhmuchocbong-form.component.html',
  styleUrls: ['./danhmuchocbong-form.component.scss']
})
export class DanhMucHocBongFormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
  constructor(
    injector: Injector,
    private _danhMucHocBongService: DanhMucHocBongService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _danhMucDonviTaiTroService: DanhMucDonViTaiTroService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._danhMucHocBongService;
    // Lấy setting mặc định được cấu hình
    this.defaultSetting = this.getDefaultSetting();
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        required: true,
      }),
      new DropdownControlSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        required: true,
        service: this._dm_NamHocService,
        sortField: 'nam',
        sortDir: -1,
        disabled: isNotFormAdd
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
        disabled: isNotFormAdd,
      }),

      new DropdownControlSchema({
        field: 'idDonViTaiTro',
        label: 'Đơn vị tài trợ',
        required: true,
        service: this._danhMucDonviTaiTroService,
      }),
      new MaskControlSchema({
        field: 'soSuat',
        label: 'Số suất',
        required: true,
        width: 3
      }),
      new MaskControlSchema({
        field: 'soTienMoiSuat',
        required: true,
        label: 'Số tiền mỗi suất',
        suffix: 'đồng',
        width: 3,
      }),
    ];
  }
}
