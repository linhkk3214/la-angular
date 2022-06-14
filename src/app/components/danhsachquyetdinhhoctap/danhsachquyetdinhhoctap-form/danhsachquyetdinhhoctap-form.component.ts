import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, FileControlSchema, TableControlSchema, EventData } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLoaiKhenThuongService } from '../../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhSachLoaiQuyetDinhService } from '../../danhsachloaiquyetdinh/services/danhsachloaiquyetdinh.service';
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
import { DanhSachQuyetDinhHocTapService } from '../services/danhsachquyetdinhhoctap.service';

@Component({
  selector: 'danhsachquyetdinhhoctap-form',
  templateUrl: './danhsachquyetdinhhoctap-form.component.html',
  styleUrls: ['./danhsachquyetdinhhoctap-form.component.scss']
})
export class DanhSachQuyetDinhHocTapFormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocTapService: DanhSachQuyetDinhHocTapService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _danhSachLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._danhSachQuyetDinhHocTapService;
    // Lấy setting mặc định được cấu hình
    this.defaultSetting = this.getDefaultSetting();
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TextControlSchema({
        field: 'soQd',
        label: 'Số quyết định',
        required: true,
      }),
      new DateTimeControlSchema({
        field: 'ngayBanHanh',
        label: 'Ngày ban hành',
        required: true
      }),
      new DropdownControlSchema({
        field: 'idLoaiQuyetDinh',
        label: 'Loại quyết định',
        required: true,
        service: this._danhSachLoaiQuyetDinhService,
      }),
      new DropdownControlSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        service: this._dm_NamHocService,
        required: true,
        sortField: 'nam',
        sortDir: -1,
        width: 3
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
        width: 3
      }),

      new DropdownControlSchema({
        field: 'idNguoiKy',
        label: 'Người ký',
        service: this._HoSoCanBoService,
        required: true
      }),
      new DateTimeControlSchema({
        field: 'ngayHieuLuc',
        label: 'Ngày hiệu lực',
        required: true

      }),
      new TextControlSchema({
        field: 'chucVuNguoiKy',
        label: 'Chức vụ người ký',
      }),
      new FileControlSchema({
        field: 'lstDinhKem',
        label: 'Đính kèm'
      }),
      new TextAreaControlSchema({
        field: 'noiDung',
        label: 'Nội dung',
        width: 12
      }),
      new TableControlSchema({
        field: 'danhSachNguoiHoc',
        label: 'Người học',
        width: 12,
        rowTemplate: [
          new DropdownControlSchema({
            field: 'idNguoiHoc',
            label: 'Người học',
            service: this._hoSoNguoiHocService,
            displayField: 'hoVaTen',
            fieldPlus: 'masv,NgaySinh,idLopHanhChinh',
            onChanged: (evt: EventData) => {
              const dropdownControl = <DropdownControlSchema>evt.control;
              const itemNguoiHocSelected = dropdownControl._component.dataSourceInternal.find(q => q.value == evt.parentModel.idNguoiHoc);
              this.setDataNguoiHoc(evt.parentModel, itemNguoiHocSelected);
            }
          }),
          new TextControlSchema({
            field: 'maSv',
            label: 'Mã sinh viên',
            disabled: true
          }),
          new DateTimeControlSchema({
            field: 'ngaySinh',
            label: 'Ngày sinh',
            disabled: true
          }),
          new DropdownControlSchema({
            field: 'idLop',
            label: 'Lớp hành chính',
            service: this._danhSachLopHanhChinhService,
            disabled: true
          })
        ]
      })
    ];
  }

  setDataNguoiHoc(model: any, itemNguoiHoc: any) {
    model.maSv = itemNguoiHoc.masv;
    model.idLop = itemNguoiHoc.idLopHanhChinh;
    model.ngaySinh = itemNguoiHoc.NgaySinh ? new Date(itemNguoiHoc.NgaySinh) : null;
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
