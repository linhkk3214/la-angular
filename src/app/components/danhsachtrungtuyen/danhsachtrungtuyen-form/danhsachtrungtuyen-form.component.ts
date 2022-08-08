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
        text: 'THÔNG TIN CÁ NHÂN',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idDotNhapHoc',
        label: 'Đợt nhập học',
        service: this._dm_DotNhapHocService,
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'maNhapHoc',
        label: 'Mã nhập học',
        required: true,
        width: 6,
        disabled: isNotFormAdd
      }),
      new TextControlSchema({
        field: 'maHoSo',
        label: 'Mã hồ sơ',
        width: 6
      }),
      new TextControlSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
        width: 6,
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
      new TextControlSchema({
        field: 'ho',
        label: 'Họ',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        required: true,
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'gioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
        required: true
      }),
      new TextControlSchema({
        field: 'cmnd',
        label: 'Số CMND/CCCD',
        width: 6
      }),
      new TextControlSchema({
        field: 'sdt',
        label: 'Số điện thoại',
        width: 6
      }),
      new TextControlSchema({
        field: 'email',
        label: 'Email',
      }),
      new DropdownControlSchema({
        field: 'idTinh',
        label: 'Tỉnh / Thành phố',
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1)
        ],
        width: 4
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
        ],
        width: 4
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
        ],
        width: 4
      }),
      new TitleSchema({
        field: 'abc',
        text: 'THÔNG TIN TUYỂN SINH',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idNganhDangKy',
        label: 'Ngành đăng ký',
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: (item) => `${item.soCTDT} - ${item.ten}`,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idNganhTrungTuyen',
        label: 'Ngành trúng tuyển',
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: (item) => `${item.soCTDT} - ${item.ten}`,
        required: true
      }),
      new MaskControlSchema({
        field: 'diemMon1',
        label: 'Điểm môn 1'
      }),
      new MaskControlSchema({
        field: 'diemMon2',
        label: 'Điểm môn 2'
      }),
      new MaskControlSchema({
        field: 'diemMon3',
        label: 'Điểm môn 3'
      }),
      new MaskControlSchema({
        field: 'diemCong',
        label: 'Điểm cộng'
      }),
      new MaskControlSchema({
        field: 'tongDiem',
        label: 'Tổng điểm'
      }),
      new TextControlSchema({
        field: 'toHopMon',
        label: 'Tổ hợp môn'
      }),
      new DropdownControlSchema({
        field: 'khuVuc',
        label: 'Khu vực',
        service: this._DM_KhuVucService
      }),
      new TextControlSchema({
        field: 'soBaoDanh',
        label: 'Số báo danh'
      }),
      new DropdownControlSchema({
        field: 'idHtTuyenSinh',
        label: 'Hình thức tuyển sinh',
        service: this._DM_HtTuyenSinhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongTuyenSinh',
        label: 'Đối tượng tuyển sinh',
        service: this._DM_DoiTuongTuyenSinhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongUuTien',
        label: 'Đối tượng ưu tiên',
        service: this._DM_DoiTuongUuTienService
      }),
      new DropdownControlSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService,
        required: true
      }),
      new DateTimeControlSchema({
        field: 'ngayQdTrungTuyen',
        label: 'Ngày quyết định trúng tuyển',
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'timeNhapHoc',
        label: 'Thời gian nhập học',
        width: 6
      }),
      new TextControlSchema({
        field: 'diaDiemNhapHoc',
        label: 'Địa điểm nhập học'
      }),
      new TextControlSchema({
        field: 'maTinhLop12',
        label: 'Mã tỉnh lớp 12'
      }),
      new TextControlSchema({
        field: 'maTruongLop12',
        label: 'Mã trường lớp 12'
      }),
      new MaskControlSchema({
        field: 'thuTuNv',
        label: 'Thứ tự nguyện vọng'
      }),
      new DropdownControlSchema({
        field: 'idHocLucTHPT',
        label: 'Học lực THPT',
        service: this._DM_HocLucService,
      }),
      new DropdownControlSchema({
        field: 'idHanhKiemTHPT',
        label: 'Hạnh kiểm',
        service: this._DM_HanhKiemService,
      }),
      new TextControlSchema({
        field: 'diaChiNhanGiayBao',
        label: 'Địa chỉ nhận giấy báo'
      }),
      new TextControlSchema({
        field: 'soQD',
        label: 'Số quyết định'
      }),
      new DropdownControlSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThaiHoSo,
        required: true
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 6
      }),
    ];
  }


}
