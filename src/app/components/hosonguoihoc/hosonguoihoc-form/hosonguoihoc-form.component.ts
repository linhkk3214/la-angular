import { Component, Injector, OnInit } from '@angular/core';
import { FormState, Operator } from 'src/app/shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, FileControlSchema, MaskControlSchema, TabViewData, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_CoSoDaoTaoService } from '../../dm-cosodaotao/services/dm-cosodaotao.service';
import { DM_DoiTuongDaoTaoService } from '../../dm-doituongdaotao/services/dm-doituongdaotao.service';
import { DM_DoiTuongTuyenSinhService } from '../../dm-doituongtuyensinh/services/dm-doituongtuyensinh.service';
import { DM_DoiTuongUuTienService } from '../../dm-doituonguutien/services/dm-doituonguutien.service';
import { DM_DonViLienKetService } from '../../dm-donvilienket/services/dm-donvilienket.service';
import { DM_GioiTinhService } from '../../dm-gioitinh/services/dm-gioitinh.service';
import { DM_HanhKiemService } from '../../dm-hanhkiem/services/dm-hanhkiem.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_HocLucService } from '../../dm-hocluc/services/dm-hocluc.service';
import { DM_HtTuyenSinhService } from '../../dm-httuyensinh/services/dm-httuyensinh.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_KhuVucService } from '../../dm-khuvuc/services/dm-khuvuc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DM_TrangThaiNguoiHocService } from '../../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { DotNhapHocService } from '../../dotnhaphoc/services/dotnhaphoc.service';
import { AddressService } from '../../user/services/address.service';
import { DanTocService } from '../../user/services/dantoc.service';
import { QuocTichService } from '../../user/services/quoctich.service';
import { ReligionService } from '../../user/services/religion.service';
import { DataSourceTrangThaiHoSo } from '../models/const';
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
    private _dm_DotNhapHocService: DotNhapHocService,
    private _dm_QuocTichService: QuocTichService,
    private _dm_DanTocService: DanTocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _dm_TonGiaoService: ReligionService,
    private _addressService: AddressService,
    private _DM_NganhService: DM_NganhService,
    private _DM_KhuVucService: DM_KhuVucService,
    private _DM_HtTuyenSinhService: DM_HtTuyenSinhService,
    private _DM_DoiTuongTuyenSinhService: DM_DoiTuongTuyenSinhService,
    private _DM_DoiTuongUuTienService: DM_DoiTuongUuTienService,
    private _DM_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
    private _DM_HocLucService: DM_HocLucService,
    private _DM_HanhKiemService: DM_HanhKiemService,
    private _DM_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService,
    private _DM_KhoaVienService: DM_KhoaVienService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _DM_HeDaoTaoService: DM_HeDaoTaoService,
    private _DM_KhoaHocService: DM_KhoaHocService

  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._HoSoNguoiHocService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'masv',
        label: 'Mã sinh viên',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'Ho',
        label: 'Họ',
        required: true,
        width: 6,
      }),
      new TextControlSchema({
        field: 'Ten',
        label: 'Tên',
        width: 6,
        required: true
      }),
      new DateTimeControlSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'GioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'quocTich',
        label: 'Quốc tịch',
        service: this._dm_QuocTichService,
        required: true,
      }),
      new DropdownControlSchema({
        field: 'danToc',
        label: 'Dân tộc',
        service: this._dm_DanTocService
      }),
      new DropdownControlSchema({
        field: 'idTonGiao',
        label: 'Tôn giáo',
        service: this._dm_TonGiaoService,
      }),
      new TextControlSchema({
        field: 'CmndSo',
        label: 'Số CMND/CCCD',
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'CmndNgayCap',
        label: 'Ngày cấp',
        width: 6
      }),
      new TextControlSchema({
        field: 'CmndNoiCap',
        label: 'Nơi cấp',
        width: 6
      }),
      new FileControlSchema({
        field: 'Anh',
        label: 'Ảnh',
        multiple: false,
        isAvatar: true
      }),
      new TextControlSchema({
        field: 'sdt',
        label: 'Số điện thoại',
        width: 6
      }),
      new DropdownControlSchema({
        field: 'idTinh',
        label: 'Tỉnh / Thành phố',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1)
        ]
      }),
      new DropdownControlSchema({
        field: 'idHuyen',
        label: 'Quận / Huyện',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 2)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idTinh')
        ]
      }),
      new DropdownControlSchema({
        field: 'idXa',
        label: 'Phường / Xã',
        service: this._addressService,
        // isServerLoad: true,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 3)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idHuyen')
        ]
      }),
      new TextControlSchema({
        field: 'email',
        label: 'Email',
      }),
      new DropdownControlSchema({
        field: 'idHe',
        label: 'Hệ',
        service: this._DM_HeDaoTaoService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._DM_KhoaHocService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idKhoa',
        label: 'Khoa/Viện',
        service: this._DM_KhoaVienService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idNganh',
        label: 'Ngành',
        service: this._DM_NganhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        service: this._DanhSachLopHanhChinhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idTrangThai',
        label: 'Trạng thái',
        service: this._DM_TrangThaiNguoiHocService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      })
    ];
  }


}
