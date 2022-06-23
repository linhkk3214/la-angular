import { Component, Injector, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataType, Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, FileControlSchema, TitleSchema } from 'src/app/shared/models/schema';
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
import { DM_TrangThaiNguoiHocService } from '../../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
import { HoSoCanBoService } from '../../user/services/hosocanbo';
import { DataSourceLoaiThongBao, DataSourceMucDoThongBao } from '../models/const';
import { ThongBaoService } from '../services/thongbao.service';

@Component({
  selector: 'thongbao-form',
  templateUrl: './thongbao-form.component.html',
  styleUrls: ['./thongbao-form.component.scss']
})
export class ThongBaoFormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
  constructor(
    injector: Injector,
    private _thongBaoService: ThongBaoService,
    private _dm_LoaiDonViTaiTroService: DM_LoaiDonViTaiTroService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_trangThaiSinhVienService: DM_TrangThaiNguoiHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._thongBaoService;
    // Lấy setting mặc định được cấu hình
    this.defaultSetting = this.getDefaultSetting();
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TitleSchema({
        field: 'abc',
        text: 'PHẠM VI THÔNG BÁO',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idHe',
        label: 'Hệ đào tạo',
        width: 6,
        service: this._dm_HeDaoTaoService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        width: 6,
        service: this._dm_KhoaHocService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idChuongTrinhDaoTao',
        label: 'Chương trình đào tạo',
        service: this._dm_CTĐTService,
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        service: this._danhSachLopHanhChinhService,
        multiple: true
      }),
      new DropdownControlSchema({
        field: 'idTrangThaiSinhVien',
        label: 'Trạng thái sinh viên',
        service: this._dm_trangThaiSinhVienService,
        multiple: true
      }),
      new TitleSchema({
        field: 'abc',
        text: 'NỘI DUNG THÔNG BÁO',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idLoaiThongBao',
        label: 'Loại thông báo',
        dataSource: DataSourceLoaiThongBao,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idMucDoThongBao',
        label: 'Mức độ thông báo',
        dataSource: DataSourceMucDoThongBao,
        required: true
      }),
      new TextControlSchema({
        field: 'tieuDe',
        label: 'Tiêu đề',
        width: 12,
        required: true
      }),
      new TextAreaControlSchema({
        field: 'noiDung',
        label: 'Nội dung',
        width: 12
      }),
      new DateTimeControlSchema({
        field: 'ngayPhatHanh',
        label: 'Ngày phát hành',
      }),
      new TextAreaControlSchema({
        field: 'moTaNgan',
        label: 'Mô tả ngắn',
        width: 12
      }),
      new FileControlSchema({
        field: 'lstFileDinhKem',
        label: 'Đính kèm'
      }),
    ];
  }
}
