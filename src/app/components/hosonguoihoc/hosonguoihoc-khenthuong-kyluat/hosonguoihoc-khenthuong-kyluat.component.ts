import { Component, Injector, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, FileControlSchema, TabViewData, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
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
import { HoSoNguoiHocService } from '../services/hosonguoihoc.service';

@Component({
  selector: 'hosonguoihoc-khenthuong-kyluat',
  templateUrl: './hosonguoihoc-khenthuong-kyluat.component.html',
  styleUrls: ['./hosonguoihoc-khenthuong-kyluat.component.scss']
})
export class HoSoNguoiHoc_KhenThuong_KyLuatComponent extends FormBase implements OnInit {
  mainTabData: TabViewData[] = [
    new TabViewData({
      code: 'thongTinChung',
      icon: 'pi pi-info-circle',
      label: 'Thông tin chung'
    }),
    new TabViewData({
      code: 'tuyenSinh',
      icon: 'pi pi-bookmark',
      label: 'Thông tin Tuyển sinh'
    }),
    new TabViewData({
      code: 'khenThuong',
      icon: 'pi pi-star',
      label: 'Danh sách khen thưởng'
    }),
    new TabViewData({
      code: 'kyLuat',
      icon: 'pi pi-times',
      label: 'Danh sách kỷ luật'
    }),
    new TabViewData({
      code: 'quyetDinh',
      icon: 'pi pi-file',
      label: 'Danh sách quyết định'
    }),
    new TabViewData({
      code: 'hocBong',
      icon: 'pi pi-money-bill',
      label: 'Danh sách học bổng'
    })
  ];
  activeIndex = 1;
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
    private _DM_KhoaHocService: DM_KhoaHocService

  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._HoSoNguoiHocService;
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TextControlSchema({
        field: 'masv',
        label: 'Mã sinh viên',
        required: true,
        disabled: isNotFormAdd
      }),
      new TextControlSchema({
        field: 'Ho',
        label: 'Họ',
        required: true,
        width: 3,
      }),
      new TextControlSchema({
        field: 'Ten',
        label: 'Tên',
        width: 3,
        required: true
      }),
      new DateTimeControlSchema({
        field: 'NgaySinh',
        label: 'Ngày sinh',
        required: true,
        width: 3
      }),
      new DropdownControlSchema({
        field: 'GioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
        required: true,
        width: 3
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
        width: 3,
      }),
      new TextControlSchema({
        field: 'CmndSo',
        label: 'Số CMND/CCCD',
        width: 3
      }),
      new DateTimeControlSchema({
        field: 'CmndNgayCap',
        label: 'Ngày cấp',
        width: 3
      }),
      new TextControlSchema({
        field: 'CmndNoiCap',
        label: 'Nơi cấp',
        width: 3
      }),
      new FileControlSchema({
        field: 'Anh',
        label: 'Ảnh',
        multiple: false,
        isAvatar: true
      }),
      new TextControlSchema({
        field: 'DienThoai',
        label: 'Số điện thoại'
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
        field: 'Email',
        label: 'Email',
      }),
      new DropdownControlSchema({
        field: 'idHe',
        label: 'Hệ',
        service: this._DM_HeDaoTaoService,
        required: true,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._DM_KhoaHocService,
        required: true,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idKhoa',
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
          this.newBindingFilter('idKhoaHoc', Operator.equal, 'idKhoaHoc')
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
      new DropdownControlSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService
      }),
      new TextAreaControlSchema({
        field: 'GhiChu',
        label: 'Ghi chú',
        width: 12
      })
    ];
  }


}
