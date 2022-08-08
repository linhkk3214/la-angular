import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, TitleSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DataSourceTrangThai } from '../../dotnhaphoc/models/const';
import { DataSourceTruongDuocSua } from '../models/const';
import { DotCapNhatHoSoNguoiHocService } from '../services/dotcapnhathosonguoihoc.service';

@Component({
  selector: 'dotcapnhathosonguoihoc-form',
  templateUrl: './dotcapnhathosonguoihoc-form.component.html',
  styleUrls: ['./dotcapnhathosonguoihoc-form.component.scss']
})
export class DotCapNhatHoSoNguoiHocFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dotcapnhathosonguoihocService: DotCapNhatHoSoNguoiHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_KhoaVienService: DM_KhoaVienService,
    private _dm_NganhService: DM_NganhService,
    private _dm_LopHanhChinhService: DanhSachLopHanhChinhService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dotcapnhathosonguoihocService;
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
      new DateTimeControlSchema({
        field: 'timeTu',
        label: 'Thời gian từ',
        required: true,
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'timeDen',
        label: 'Thời gian đến',
        required: true,
        width: 6
      }),
      new TitleSchema({
        field: 'abc',
        text: 'PHẠM VI',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idHeDaoTaos',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idKhoaHocs',
        label: 'Khóa học',
        service: this._dm_KhoaHocService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idKhoaViens',
        label: 'Khoa/Viện',
        service: this._dm_KhoaVienService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idNganhs',
        label: 'Ngành',
        service: this._dm_NganhService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idLopHanhChinhs',
        label: 'Lớp hành chính',
        service: this._dm_LopHanhChinhService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'truongDuocSuas',
        label: 'Trường được phép sửa',
        dataSource: DataSourceTruongDuocSua,
        multiple: true
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      }),

    ];
  }
}
