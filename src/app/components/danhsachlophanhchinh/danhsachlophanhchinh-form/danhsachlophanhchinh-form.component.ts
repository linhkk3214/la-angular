import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { HoSoCanBoService } from '../../user/services/hosocanbo';
import { DanhSachLopHanhChinhService } from '../services/danhsachlophanhchinh.service';

@Component({
  selector: 'danhsachlophanhchinh-form',
  templateUrl: './danhsachlophanhchinh-form.component.html',
  styleUrls: ['./danhsachlophanhchinh-form.component.scss']
})
export class DanhSachLopHanhChinhFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_KhoaVienService: DM_KhoaVienService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DanhSachLopHanhChinhService;
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
        service: this._dm_KhoaHocService,
        bindingFilters: [
          this.newBindingFilter('idHeDaoTao', Operator.equal, 'idHeDaoTao')
        ],
      }),
      new DropdownControlSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        required: true,
        service: this._dm_KhoaVienService
      }),
      new DropdownControlSchema({
        field: 'idChuongTrinhDaoTao',
        label: 'Ngành',
        required: true,
        service: this._dm_CTĐTService,
        bindingFilters: [
          this.newBindingFilter('idKhoaHoc', Operator.equal, 'idKhoaHoc'),
          this.newBindingFilter('idKhoaVien', Operator.equal, 'idKhoaVien')
        ],
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        }
      }),
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên lớp',
        required: true,
        width: 6
      }),

      new DropdownControlSchema({
        field: 'idGVCN',
        label: 'Giáo viên chủ nhiệm',
        service: this._HoSoCanBoService,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      }),
      new DropdownControlSchema({
        field: 'idCVHTs',
        label: 'Cố vấn học tập',
        service: this._HoSoCanBoService,
        multiple: true,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      })
    ];
  }
}
