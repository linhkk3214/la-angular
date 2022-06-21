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
import { DM_LoaiDonViTaiTroService } from '../../dm-loaidonvitaitro/services/dm-loaidonvitaitro.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
import { HoSoCanBoService } from '../../user/services/hosocanbo';
import { DanhMucDonViTaiTroService } from '../services/danhmucdonvitaitro.service';

@Component({
  selector: 'danhmucdonvitaitro-form',
  templateUrl: './danhmucdonvitaitro-form.component.html',
  styleUrls: ['./danhmucdonvitaitro-form.component.scss']
})
export class DanhMucDonViTaiTroFormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
  constructor(
    injector: Injector,
    private _danhMucDonViTaiTroService: DanhMucDonViTaiTroService,
    private _dm_LoaiDonViTaiTroService: DM_LoaiDonViTaiTroService,
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
    this.setting.service = this._danhMucDonViTaiTroService;
    // Lấy setting mặc định được cấu hình
    this.defaultSetting = this.getDefaultSetting();
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên đơn vị',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'idLoaiDonVi',
        label: 'Loại đơn vị',
        required: true,
        service: this._dm_LoaiDonViTaiTroService,
      }),
      new TextControlSchema({
        field: 'diaChi',
        label: 'Địa chỉ',
      }),
      new TextControlSchema({
        field: 'sdt',
        label: 'Số điện thoại',
      }),
      new TextControlSchema({
        field: 'email',
        label: 'Email',
        dataFormat: 'email'
      }),
      new TextControlSchema({
        field: 'nguoiDaiDien',
        label: 'Người đại diện'
      }),
      new TextControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú'
      }),
    ];
  }
}
