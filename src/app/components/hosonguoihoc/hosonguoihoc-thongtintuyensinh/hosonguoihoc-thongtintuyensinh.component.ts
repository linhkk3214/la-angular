import { Component, Injector, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, FileControlSchema, MaskControlSchema, TabViewData, TextAreaControlSchema, TextControlSchema, TitleSchema } from 'src/app/shared/models/schema';
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
import { HoSoNguoiHocService } from '../services/hosonguoihoc.service';
import { DanhSachTrungTuyenService } from '../../danhsachtrungtuyen/services/danhsachtrungtuyen.service';
import { DotNhapHocService } from '../../dotnhaphoc/services/dotnhaphoc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DM_KhuVucService } from '../../dm-khuvuc/services/dm-khuvuc.service';
import { DM_HtTuyenSinhService } from '../../dm-httuyensinh/services/dm-httuyensinh.service';
import { DM_DoiTuongTuyenSinhService } from '../../dm-doituongtuyensinh/services/dm-doituongtuyensinh.service';
import { DM_DoiTuongUuTienService } from '../../dm-doituonguutien/services/dm-doituonguutien.service';
import { DM_HocLucService } from '../../dm-hocluc/services/dm-hocluc.service';
import { DM_HanhKiemService } from '../../dm-hanhkiem/services/dm-hanhkiem.service';
import { DataSourceTrangThaiHoSo } from '../../danhsachtrungtuyen/models/const';
@Component({
  selector: 'hosonguoihoc-thongtintuyensinh',
  templateUrl: './hosonguoihoc-thongtintuyensinh.component.html',
  styleUrls: ['./hosonguoihoc-thongtintuyensinh.component.scss']
})
export class HoSoNguoiHoc_ThongTinTuyenSinhComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _danhSachTrungTuyenService: DanhSachTrungTuyenService,
    private _dm_DotNhapHocService: DotNhapHocService,
    private _dm_QuocTichService: QuocTichService,
    private _dm_DanTocService: DanTocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _addressService: AddressService,
    private _DM_NganhService: DM_NganhService,
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
    this.setting.service = this._danhSachTrungTuyenService;
    const isNotFormAdd = !this._isFormAddNew();
    this.setting.schema = [
      new TitleSchema({
        field: 'abc',
        text: 'THÔNG TIN TUYỂN SINH',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idDotNhapHoc',
        label: 'Đợt nhập học',
        service: this._dm_DotNhapHocService,
        required: true,
        width: 6
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
      new DropdownControlSchema({
        field: 'idNganhDangKy',
        label: 'Ngành đăng ký',
        service: this._DM_NganhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idNganhTrungTuyen',
        label: 'Ngành trúng tuyển',
        service: this._DM_NganhService,
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
      new TextControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 6
      }),
    ];
  }

}
