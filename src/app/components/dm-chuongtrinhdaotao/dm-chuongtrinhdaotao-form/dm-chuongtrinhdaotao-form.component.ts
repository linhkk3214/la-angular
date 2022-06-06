import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DM_TrinhDoDaoTaoService } from '../../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
import { DM_ChuongTrinhDaoTaoService } from '../services/dm-chuongtrinhdaotao.service';

@Component({
  selector: 'dm-chuongtrinhdaotao-form',
  templateUrl: './dm-chuongtrinhdaotao-form.component.html',
  styleUrls: ['./dm-chuongtrinhdaotao-form.component.scss']
})
export class DM_ChuongTrinhDaoTaoFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_TrinhDoDaoTaoService: DM_TrinhDoDaoTaoService,
    private _dm_NganhService: DM_NganhService,
    private _dm_KhoaVienService: DM_KhoaVienService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_ChuongTrinhDaoTaoService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        required: true,
        service: this._dm_HeDaoTaoService
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        required: true,
        service: this._dm_KhoaHocService
      }),
      new DropdownControlSchema({
        field: 'idTrinhDoDaoTao',
        label: 'Trình độ đào tạo',
        required: true,
        service: this._dm_TrinhDoDaoTaoService
      }),
      new DropdownControlSchema({
        field: 'idNganh',
        label: 'Ngành đào tạo',
        required: true,
        service: this._dm_NganhService
      }),
      new DropdownControlSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện phụ trách',
        required: true,
        service: this._dm_KhoaVienService
      }),
      new TextControlSchema({
        field: 'soCTDT',
        label: 'Số chương trình đào tạo',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên chương trình đào tạo',
        required: true,
        width: 6
      }),
      new MaskControlSchema({
        field: 'tongTC',
        required: true,
        label: 'Tổng số tín chỉ'
      }),
      new MaskControlSchema({
        field: 'soNamDT',
        required: true,
        label: 'Số năm đào tạo'
      }),
      new MaskControlSchema({
        field: 'soNamDTmax',
        required: true,
        label: 'Số năm đào tạo tối đa'
      })
    ];
  }
}
