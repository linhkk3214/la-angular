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
        text: 'TH??NG TIN CHUNG',
        width: 12
      }),
      new FileControlSchema({
        field: 'anh',
        label: '???nh',
        centerLabel: true,
        multiple: false,
        isAvatar: true,
        rowSpan: 4,
        width: 2
      }),
      new TextControlSchema({
        field: 'maSv',
        label: 'M?? sinh vi??n',
        required: true,
        disabled: isNotFormAdd,
        width: 4
      }),
      new TextControlSchema({
        field: 'ho',
        label: 'H???',
        required: true,
        width: 3,
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'T??n',
        width: 3,
        required: true
      }),
      new DateTimeControlSchema({
        field: 'ngaySinh',
        label: 'Ng??y sinh',
        required: true,
        width: 2
      }),
      new DropdownControlSchema({
        field: 'gioiTinh',
        label: 'Gi???i t??nh',
        service: this._dm_GioiTinhService,
        required: true,
        width: 2
      }),
      new DropdownControlSchema({
        field: 'idQuocTich',
        label: 'Qu???c t???ch',
        service: this._dm_QuocTichService,
        required: true,
        width: 3,
      }),
      new DropdownControlSchema({
        field: 'idDanToc',
        label: 'D??n t???c',
        service: this._dm_DanTocService,
        width: 3
      }),
      new DropdownControlSchema({
        field: 'idTonGiao',
        label: 'T??n gi??o',
        service: this._dm_TonGiaoService,
        width: 2,
      }),
      new TextControlSchema({
        field: 'cmndSo',
        label: 'S??? CMND/CCCD',
        width: 2
      }),
      new DateTimeControlSchema({
        field: 'cmndNgayCap',
        label: 'Ng??y c???p',
        width: 3
      }),
      new TextControlSchema({
        field: 'cmndNoiCap',
        label: 'N??i c???p',
        width: 3
      }),
      new TextControlSchema({
        field: 'dienThoai',
        label: 'S??? ??i???n tho???i',
        width: 2
      }),
      new TextControlSchema({
        field: 'email',
        label: 'Email',
        width: 2
      }),
      new TitleSchema({
        field: 'abc',
        text: 'TH??NG TIN NG??NH CH??NH',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idHe',
        label: 'H???',
        service: this._DM_HeDaoTaoService,
        required: true,
        disabled: isNotFormAdd,
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Kh??a h???c',
        service: this._DM_KhoaHocService,
        required: true,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Vi???n',
        service: this._DM_KhoaVienService,
        required: true,
        disabled: isNotFormAdd
      }),
      new DropdownControlSchema({
        field: 'idNganh',
        label: 'Ng??nh',
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
        label: 'L???p h??nh ch??nh',
        service: this._DanhSachLopHanhChinhService,
        bindingFilters: [
          this.newBindingFilter('idChuongTrinhDaoTao', Operator.equal, 'idNganh')
        ],
        required: true
      }),
      new DropdownControlSchema({
        field: 'idTrangThai',
        label: 'Tr???ng th??i',
        service: this._DM_TrangThaiNguoiHocService,
        required: true
      }),
      new MaskControlSchema({
        field: 'soNamDT',
        required: true,
        label: 'S??? n??m ????o t???o t???i ??a',
        width: 3,
        suffix: 'N??m',
        disabled: true,
      }),
      new MaskControlSchema({
        field: 'soNamDTmax',
        required: true,
        label: 'S??? n??m ????o t???o t???i ??a',
        width: 3,
        suffix: 'N??m',
        disabled: true,
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongDaoTao',
        label: '?????i t?????ng ????o t???o',
        service: this._DM_DoiTuongDaoTaoService
      }),
      new TitleSchema({
        field: '12',
        text: 'TH??NG TIN NG??NH 2',
        width: 12,
        hiddenCheck: () => {
          // N???u k c?? ng??nh 2 th?? ???n field n??y ??i,
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idHe2',
        label: 'H???',
        service: this._DM_HeDaoTaoService,
        required: true,
        disabled: isNotFormAdd,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        },
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc2',
        label: 'Kh??a h???c',
        service: this._DM_KhoaHocService,
        required: true,
        disabled: isNotFormAdd,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idKhoaVien2',
        label: 'Khoa/Vi???n',
        service: this._DM_KhoaVienService,
        required: true,
        disabled: isNotFormAdd,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idNganh2',
        label: 'Ng??nh',
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
        required: true,
        label: 'S??? n??m ????o t???o',
        width: 3,
        suffix: 'N??m',
        disabled: true,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new MaskControlSchema({
        field: 'soNamDTmax2',
        required: true,
        label: 'S??? n??m ????o t???o t???i ??a',
        width: 3,
        suffix: 'N??m',
        disabled: true,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new DropdownControlSchema({
        field: 'idTrangThaiNganh2',
        label: 'Tr???ng th??i',
        service: this._DM_TrangThaiNguoiHocService,
        required: true,
        disabled: true,
        hiddenCheck: () => {
          return !this.model.data.idNganh2;
        }
      }),
      new TitleSchema({
        field: 'abc',
        text: 'TH??NG TIN QU?? QU??N',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idTinhqq',
        label: 'T???nh / Th??nh ph???',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1),
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idHuyenqq',
        label: 'Qu???n / Huy???n',
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
        label: 'Ph?????ng / X??',
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
        text: 'H??? KH???U TH?????NG TR??',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idTinhtt',
        label: 'T???nh / Th??nh ph???',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1),
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idHuyentt',
        label: 'Qu???n / Huy???n',
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
        label: 'Ph?????ng / X??',
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
        text: '?????A CH??? HI???N NAY',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idTinhhn',
        label: 'T???nh / Th??nh ph???',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1),
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idHuyenhn',
        label: 'Qu???n / Huy???n',
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
        label: 'Ph?????ng / X??',
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
        text: 'QUAN H??? TH??N NH??N',
        width: 12
      }),
      new TableControlSchema({
        field: 'danhSachNhanThan',
        label: '',
        width: 12,
        rowTemplate: [
          new DropdownControlSchema({
            field: 'idMoiQuanHe',
            label: 'M???i quan h???',
            width: 2,
            dataSource: DataSourceMoiQuanHe,
            required: true
          }),
          new TextControlSchema({
            field: 'tenNhanThan',
            label: 'H??? v?? t??n',
            width: 2,
            required: true
          }),
          new DateTimeControlSchema({
            field: 'ngaySinhNhanThan',
            label: 'Ng??y sinh',
            width: 2,
          }),
          new TextControlSchema({
            field: 'ngheNghiepNhanThan',
            label: 'Ngh??? nghi???p',
            width: 2
          }),
          new TextControlSchema({
            field: 'noiONhanThan',
            label: 'N??i ???',
            width: 2,
          }),
          new TextControlSchema({
            field: 'sdtNhanThan',
            label: 'S??? ??i???n tho???i',
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
    // L???y th??m th??ng tin nh??n th??n c???a sinh vi??n
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

