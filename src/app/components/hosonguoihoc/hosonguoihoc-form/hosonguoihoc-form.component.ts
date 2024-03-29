import { Component, getNgModuleById, Injector, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, EventData, FileControlSchema, ListData, MaskControlSchema, TableControlSchema, TextAreaControlSchema, TextControlSchema, TitleSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_DoiTuongDaoTaoService } from '../../dm-doituongdaotao/services/dm-doituongdaotao.service';
import { DM_GioiTinhService } from '../../dm-gioitinh/services/dm-gioitinh.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_TrangThaiNguoiHocService } from '../../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { AddressService } from '../../user/services/address.service';
import { DanTocService } from '../../user/services/dantoc.service';
import { QuocTichService } from '../../user/services/quoctich.service';
import { ReligionService } from '../../user/services/religion.service';
import { DataSourceMoiQuanHe } from '../models/const';
import { HoSoNguoiHoc_NhanThanService } from '../services/hosonguoihoc-nhanthan.service';
import { HoSoNguoiHocService } from '../services/hosonguoihoc.service';

@Component({
  selector: 'hosonguoihoc-form',
  templateUrl: './hosonguoihoc-form.component.html',
  styleUrls: ['./hosonguoihoc-form.component.scss']
})
export class HoSoNguoiHocFormComponent extends FormBase implements OnInit {

  constructor(
    injector: Injector,
    private _HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_QuocTichService: QuocTichService,
    private _dm_DanTocService: DanTocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _dm_TonGiaoService: ReligionService,
    private _addressService: AddressService,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService,
    private _DM_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
    private _DM_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService,
    private _DM_KhoaVienService: DM_KhoaVienService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _DM_HeDaoTaoService: DM_HeDaoTaoService,
    private _DM_KhoaHocService: DM_KhoaHocService,
    private _hoSoNguoiHoc_NhanThanService: HoSoNguoiHoc_NhanThanService

  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._HoSoNguoiHocService;
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TitleSchema({
        field: 'abc',
        text: 'THÔNG TIN CHUNG',
        width: 12
      }),
      new FileControlSchema({
        field: 'anh',
        label: 'Ảnh',
        centerLabel: true,
        multiple: false,
        isAvatar: true,
        rowSpan: 4,
        width: 2
      }),
      new TextControlSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
        required: true,
        disabled: isNotFormAdd,
        width: 4
      }),
      new TextControlSchema({
        field: 'ho',
        label: 'Họ',
        required: true,
        width: 3,
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        width: 3,
        required: true
      }),
      new DateTimeControlSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
        required: true,
        width: 2
      }),
      new DropdownControlSchema({
        field: 'gioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
        required: true,
        width: 2
      }),
      new DropdownControlSchema({
        field: 'idQuocTich',
        label: 'Quốc tịch',
        service: this._dm_QuocTichService,
        required: true,
        width: 3,
      }),
      new DropdownControlSchema({
        field: 'idDanToc',
        label: 'Dân tộc',
        service: this._dm_DanTocService,
        width: 3
      }),
      new DropdownControlSchema({
        field: 'idTonGiao',
        label: 'Tôn giáo',
        service: this._dm_TonGiaoService,
        width: 2,
      }),
      new TextControlSchema({
        field: 'cmndSo',
        label: 'Số CMND/CCCD',
        width: 2
      }),
      new DateTimeControlSchema({
        field: 'cmndNgayCap',
        label: 'Ngày cấp',
        width: 3
      }),
      new TextControlSchema({
        field: 'cmndNoiCap',
        label: 'Nơi cấp',
        width: 3
      }),
      new TextControlSchema({
        field: 'dienThoai',
        label: 'Số điện thoại',
        width: 2
      }),
      new TextControlSchema({
        field: 'email',
        label: 'Email',
        width: 2
      }),
      new TitleSchema({
        field: 'abc',
        text: 'THÔNG TIN NGÀNH CHÍNH',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idHe',
        label: 'Hệ',
        service: this._DM_HeDaoTaoService,
        required: true,
        disabled: isNotFormAdd,
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._DM_KhoaHocService,
        required: true,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        service: this._DM_KhoaVienService,
        required: true,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idNganh',
        label: 'Ngành',
        required: true,
        service: this._dm_ChuongTrinhDaoTaoService,
        bindingFilters: [
          this.newBindingFilter('idKhoaHoc', Operator.equal, 'idKhoaHoc'),
          this.newBindingFilter('idKhoaVien', Operator.equal, 'idKhoaVien'),
        ],
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        service: this._DanhSachLopHanhChinhService,
        bindingFilters: [
          this.newBindingFilter('idChuongTrinhDaoTao', Operator.equal, 'idNganh')
        ],
        required: true
      }),
      new DropdownControlSchema({
        field: 'idTrangThai',
        label: 'Trạng thái',
        service: this._DM_TrangThaiNguoiHocService,
        required: true
      }),
      new MaskControlSchema({
        field: 'soNamDT',
        label: 'Số năm đào tạo tối đa',
        width: 3,
        suffix: 'Năm',
        disabled: true,
      }),
      new MaskControlSchema({
        field: 'soNamDTmax',
        label: 'Số năm đào tạo tối đa',
        width: 3,
        suffix: 'Năm',
        disabled: true,
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService
      }),
      new TitleSchema({
        field: '12',
        text: 'THÔNG TIN NGÀNH 2',
        width: 12,
        hiddenCheck: () => {
          // Nếu k có ngành 2 thì ẩn field này đi,
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idHe2',
        label: 'Hệ',
        service: this._DM_HeDaoTaoService,
        required: true,
        disabled: isNotFormAdd,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        },
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc2',
        label: 'Khóa học',
        service: this._DM_KhoaHocService,
        required: true,
        disabled: isNotFormAdd,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idKhoaVien2',
        label: 'Khoa/Viện',
        service: this._DM_KhoaVienService,
        required: true,
        disabled: isNotFormAdd,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idNganh2',
        label: 'Ngành',
        required: true,
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: item => {
          return `${item.soCTDT} - ${item.ten}`;
        },
        disabled: isNotFormAdd,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new MaskControlSchema({
        field: 'soNamDT2',
        label: 'Số năm đào tạo',
        width: 3,
        suffix: 'Năm',
        disabled: true,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new MaskControlSchema({
        field: 'soNamDTmax2',
        label: 'Số năm đào tạo tối đa',
        width: 3,
        suffix: 'Năm',
        disabled: true,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idTrangThaiNganh2',
        label: 'Trạng thái',
        service: this._DM_TrangThaiNguoiHocService,
        required: true,
        disabled: true,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new TitleSchema({
        field: 'abc',
        text: 'THÔNG TIN QUÊ QUÁN',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idTinhqq',
        label: 'Tỉnh / Thành phố',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1),
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idHuyenqq',
        label: 'Quận / Huyện',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 2)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idTinhqq')
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idXaqq',
        label: 'Phường / Xã',
        service: this._addressService,
        // isServerLoad: true,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 3)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idHuyenqq')
        ],
        width: 4
      }),
      new TitleSchema({
        field: 'abc',
        text: 'HỘ KHẨU THƯỜNG TRÚ',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idTinhtt',
        label: 'Tỉnh / Thành phố',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1),
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idHuyentt',
        label: 'Quận / Huyện',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 2)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idTinhtt')
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idXatt',
        label: 'Phường / Xã',
        service: this._addressService,
        // isServerLoad: true,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 3)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idHuyentt')
        ],
        width: 4
      }),
      new TitleSchema({
        field: 'abc',
        text: 'ĐỊA CHỈ HIỆN NAY',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idTinhhn',
        label: 'Tỉnh / Thành phố',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1),
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idHuyenhn',
        label: 'Quận / Huyện',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 2)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idTinhhn')
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idXahn',
        label: 'Phường / Xã',
        service: this._addressService,
        // isServerLoad: true,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 3)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idXahn')
        ],
        width: 4
      }),
      new TitleSchema({
        field: 'abc',
        text: 'QUAN HỆ THÂN NHÂN',
        width: 12
      }),
      new TableControlSchema({
        field: 'danhSachNhanThan',
        label: '',
        width: 12,
        rowTemplate: [
          new DropdownControlSchema({
            field: 'idMoiQuanHe',
            label: 'Mối quan hệ',
            width: 2,
            dataSource: DataSourceMoiQuanHe,
          }),
          new TextControlSchema({
            field: 'tenNhanThan',
            label: 'Họ và tên',
            width: 2,
          }),
          new DateTimeControlSchema({
            field: 'ngaySinhNhanThan',
            label: 'Ngày sinh',
            width: 2,
          }),
          new TextControlSchema({
            field: 'ngheNghiepNhanThan',
            label: 'Nghề nghiệp',
            width: 2
          }),
          new TextControlSchema({
            field: 'noiONhanThan',
            label: 'Nơi ở',
            width: 2,
          }),
          new TextControlSchema({
            field: 'sdtNhanThan',
            label: 'Số điện thoại',
            width: 2,
          }),
          new TextControlSchema({
            field: 'emailNhanThan',
            label: 'Email',
            width: 2
          }),
        ]
      })
    ];
  }

  override async onFormInitialized(data: EventData) {
    if (this._isFormAddNew()) return;
    // Lấy thêm thông tin nhân thân của sinh viên
    const lstNhanThan = (await this._hoSoNguoiHoc_NhanThanService.getAllByFilter([
      this.newFilter('idNguoiHoc', Operator.equal, this.model.data._id)
    ])).data;
    // data.danhSachNhanThan = lstNhanThan;
    this.crudForm.setTableNodeDataSource('danhSachNhanThan', lstNhanThan);
  }

  override async modifyDetailData(data: any): Promise<void> {
    if (data.idNganh) {
      const itemNganh = (await this._dm_ChuongTrinhDaoTaoService.getDetail(data.idNganh)).data;
      if (itemNganh) {
        data.soNamDT = itemNganh.soNamDT;
        data.soNamDTmax = itemNganh.soNamDTmax;
      }
    }
    if (data.idNganh2) {
      const itemNganh2 = (await this._dm_ChuongTrinhDaoTaoService.getDetail(data.idNganh2)).data;
      if (itemNganh2) {
        data.idHe2 = itemNganh2.idHeDaoTao;
        data.idKhoaVien2 = itemNganh2.idKhoaVien;
        data.idKhoaHoc2 = itemNganh2.idKhoaHoc;
        data.soNamDT2 = itemNganh2.soNamDT;
        data.soNamDTmax2 = itemNganh2.soNamDTmax;
      }
    }
  }
}

