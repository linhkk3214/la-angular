import { Component, Injector, OnInit } from '@angular/core';
import { FormState, Operator } from 'src/app/shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, MaskControlSchema, TabViewData, TextAreaControlSchema, TextControlSchema, TitleSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
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
import { DM_KhuVucService } from '../../dm-khuvuc/services/dm-khuvuc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DotNhapHocService } from '../../dotnhaphoc/services/dotnhaphoc.service';
import { AddressService } from '../../user/services/address.service';
import { DanTocService } from '../../user/services/dantoc.service';
import { QuocTichService } from '../../user/services/quoctich.service';
import { ReligionService } from '../../user/services/religion.service';
import { DataSourceTrangThaiHoSo } from '../models/const';
import { DanhSachTrungTuyenService } from '../services/danhsachtrungtuyen.service';

@Component({
  selector: 'danhsachtrungtuyen-form',
  templateUrl: './danhsachtrungtuyen-form.component.html',
  styleUrls: ['./danhsachtrungtuyen-form.component.scss']
})
export class DanhSachTrungTuyenFormComponent extends FormBase implements OnInit {

  constructor(
    injector: Injector,
    private _DanhSachTrungTuyenService: DanhSachTrungTuyenService,
    private _dm_DotNhapHocService: DotNhapHocService,
    private _dm_QuocTichService: QuocTichService,
    private _dm_DanTocService: DanTocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _addressService: AddressService,
    private _DM_NganhService: DM_NganhService,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService,
    private _DM_KhuVucService: DM_KhuVucService,
    private _DM_HtTuyenSinhService: DM_HtTuyenSinhService,
    private _DM_DoiTuongTuyenSinhService: DM_DoiTuongTuyenSinhService,
    private _DM_DoiTuongUuTienService: DM_DoiTuongUuTienService,
    private _DM_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
    private _DM_HocLucService: DM_HocLucService,
    private _DM_HanhKiemService: DM_HanhKiemService,

  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DanhSachTrungTuyenService;
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TitleSchema({
        field: 'abc',
        text: 'TH??NG TIN C?? NH??N',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idDotNhapHoc',
        label: '?????t nh???p h???c',
        service: this._dm_DotNhapHocService,
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'maNhapHoc',
        label: 'M?? nh???p h???c',
        required: true,
        width: 6,
        disabled: isNotFormAdd
      }),
      new TextControlSchema({
        field: 'maHoSo',
        label: 'M?? h??? s??',
        width: 6
      }),
      new TextControlSchema({
        field: 'maSv',
        label: 'M?? sinh vi??n',
        width: 6,
        required: true
      }),
      new DropdownControlSchema({
        field: 'quocTich',
        label: 'Qu???c t???ch',
        service: this._dm_QuocTichService,
        required: true,
      }),
      new DropdownControlSchema({
        field: 'danToc',
        label: 'D??n t???c',
        service: this._dm_DanTocService
      }),
      new TextControlSchema({
        field: 'ho',
        label: 'H???',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'T??n',
        required: true,
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'ngaySinh',
        label: 'Ng??y sinh',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'gioiTinh',
        label: 'Gi???i t??nh',
        service: this._dm_GioiTinhService,
        required: true
      }),
      new TextControlSchema({
        field: 'cmnd',
        label: 'S??? CMND/CCCD',
        width: 6
      }),
      new TextControlSchema({
        field: 'sdt',
        label: 'S??? ??i???n tho???i',
        width: 6
      }),
      new TextControlSchema({
        field: 'email',
        label: 'Email',
      }),
      new DropdownControlSchema({
        field: 'idTinh',
        label: 'T???nh / Th??nh ph???',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1)
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idHuyen',
        label: 'Qu???n / Huy???n',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 2)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idTinh')
        ],
        width: 4
      }),
      new DropdownControlSchema({
        field: 'idXa',
        label: 'Ph?????ng / X??',
        service: this._addressService,
        // isServerLoad: true,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 3)
        ],
        bindingFilters: [
          this.newBindingFilter('parentId', Operator.equal, 'idHuyen')
        ],
        width: 4
      }),
      new TitleSchema({
        field: 'abc',
        text: 'TH??NG TIN TUY???N SINH',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idNganhDangKy',
        label: 'Ng??nh ????ng k??',
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: (item) => `${item.soCTDT} - ${item.ten}`,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idNganhTrungTuyen',
        label: 'Ng??nh tr??ng tuy???n',
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: (item) => `${item.soCTDT} - ${item.ten}`,
        required: true
      }),
      new MaskControlSchema({
        field: 'diemMon1',
        label: '??i???m m??n 1'
      }),
      new MaskControlSchema({
        field: 'diemMon2',
        label: '??i???m m??n 2'
      }),
      new MaskControlSchema({
        field: 'diemMon3',
        label: '??i???m m??n 3'
      }),
      new MaskControlSchema({
        field: 'diemCong',
        label: '??i???m c???ng'
      }),
      new MaskControlSchema({
        field: 'tongDiem',
        label: 'T???ng ??i???m'
      }),
      new TextControlSchema({
        field: 'toHopMon',
        label: 'T??? h???p m??n'
      }),
      new DropdownControlSchema({
        field: 'khuVuc',
        label: 'Khu v???c',
        service: this._DM_KhuVucService
      }),
      new TextControlSchema({
        field: 'soBaoDanh',
        label: 'S??? b??o danh'
      }),
      new DropdownControlSchema({
        field: 'idHtTuyenSinh',
        label: 'H??nh th???c tuy???n sinh',
        service: this._DM_HtTuyenSinhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongTuyenSinh',
        label: '?????i t?????ng tuy???n sinh',
        service: this._DM_DoiTuongTuyenSinhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongUuTien',
        label: '?????i t?????ng ??u ti??n',
        service: this._DM_DoiTuongUuTienService
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongDaoTao',
        label: '?????i t?????ng ????o t???o',
        service: this._DM_DoiTuongDaoTaoService,
        required: true
      }),
      new DateTimeControlSchema({
        field: 'ngayQdTrungTuyen',
        label: 'Ng??y quy???t ?????nh tr??ng tuy???n',
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'timeNhapHoc',
        label: 'Th???i gian nh???p h???c',
        width: 6
      }),
      new TextControlSchema({
        field: 'diaDiemNhapHoc',
        label: '?????a ??i???m nh???p h???c'
      }),
      new TextControlSchema({
        field: 'maTinhLop12',
        label: 'M?? t???nh l???p 12'
      }),
      new TextControlSchema({
        field: 'maTruongLop12',
        label: 'M?? tr?????ng l???p 12'
      }),
      new MaskControlSchema({
        field: 'thuTuNv',
        label: 'Th??? t??? nguy???n v???ng'
      }),
      new DropdownControlSchema({
        field: 'hocLucTHPT',
        label: 'H???c l???c THPT',
        service: this._DM_HocLucService,
      }),
      new DropdownControlSchema({
        field: 'hanhKiemTHPT',
        label: 'H???nh ki???m',
        service: this._DM_HanhKiemService,
      }),
      new TextControlSchema({
        field: 'diaChiNhanGiayBao',
        label: '?????a ch??? nh???n gi???y b??o'
      }),
      new TextControlSchema({
        field: 'soQD',
        label: 'S??? quy???t ?????nh'
      }),
      new DropdownControlSchema({
        field: 'trangThai',
        label: 'Tr???ng th??i',
        dataSource: DataSourceTrangThaiHoSo,
        required: true
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi ch??',
        width: 6
      }),
    ];
  }


}
