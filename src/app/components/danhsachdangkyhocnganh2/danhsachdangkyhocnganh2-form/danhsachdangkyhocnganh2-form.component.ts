import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, TitleSchema, MaskControlSchema, EventData } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_HocKyService } from '../../dm-hocky/services/dm-hocky.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DotDangKyHocNganh2Service } from '../../dotdangkyhocnganh2/services/dotdangkyhocnganh2.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
import { DanhSachDangKyHocNganh2Service } from '../services/danhsachdangkyhocnganh2.service';

@Component({
  selector: 'danhsachdangkyhocnganh2-form',
  templateUrl: './danhsachdangkyhocnganh2-form.component.html',
  styleUrls: ['./danhsachdangkyhocnganh2-form.component.scss']
})
export class DanhSachDangKyHocNganh2FormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
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
    this.setting.service = this._DanhSachDangKyHocNganh2Service;
    this.defaultSetting = this.getDefaultSetting();
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idDotDangKy',
        label: 'Đợt đăng ký học',
        service: this._dotDangKyHocNganh2Service,
        required: true,
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idNguoiHoc',
        label: 'Sinh viên',
        service: this._hoSoNguoiHocService,
        funcGetLabel: item => {
          return `${item.hoVaTen} (${item.maSv})`;
        },
        fieldPlus: 'maSv,ngaySinh,idLopHanhChinh, idNganh',
        onChanged: (evt: EventData) => {
          const dropdownControl = <DropdownControlSchema>evt.control;
          const itemNguoiHocSelected = dropdownControl._component.dataSourceInternal.find(q => q.value == evt.parentModel.idNguoiHoc);
          this.setDataNguoiHoc(evt.parentModel, itemNguoiHocSelected);
        }
      }),
      new DropdownControlSchema({
        field: 'idLop',
        label: 'Lớp hành chính',
        service: this._danhSachLopHanhChinhService,
        disabled: true
      }),
      new DropdownControlSchema({
        field: 'idNganh',
        label: 'Ngành',
        service: this._dm_CTĐTService,
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
        disabled: true
      }),
      new DropdownControlSchema({
        field: 'idNganhDangKy',
        label: 'Ngành đăng ký',
        service: this._dm_CTĐTService,
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
      }),
    ];
  }

  setDataNguoiHoc(model: any, itemNguoiHoc: any) {
    model.maSv = itemNguoiHoc.maSv;
    model.idNganh = itemNguoiHoc.idNganh;
    model.idLop = itemNguoiHoc.idLopHanhChinh;
    model.ngaySinh = itemNguoiHoc.ngaySinh ? new Date(itemNguoiHoc.ngaySinh) : null;
  }

  override async modifyDetailData(data: any): Promise<void> {
    // Lấy danh sách người học
    if (data.lstIdNguoiHoc) {
      const lstNguoiHoc = (await this._hoSoNguoiHocService.getAllByFilter([
        this.newFilter('_id', Operator.in, data.lstIdNguoiHoc)
      ])).data;
      data.danhSachNguoiHoc = lstNguoiHoc.map(q => {
        const result = {
          idNguoiHoc: q._id
        };
        this.setDataNguoiHoc(result, q);
        return result;
      });
    }
  }

  override onBeforeSave(): void | Promise<boolean> {
    this.model.data.lstIdNguoiHoc = [];
    if (this.model.data.danhSachNguoiHoc && this.model.data.danhSachNguoiHoc.length) {
      this.model.data.lstIdNguoiHoc = this.model.data.danhSachNguoiHoc.map(q => q.idNguoiHoc);
    }
  }
}
