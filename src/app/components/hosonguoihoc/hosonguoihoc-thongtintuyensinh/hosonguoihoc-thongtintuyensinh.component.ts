import { Component, Injector, Input, OnInit } from '@angular/core';
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
import { ResponseResult } from 'src/app/shared/models/response-result';
@Component({
  selector: 'hosonguoihoc-thongtintuyensinh',
  templateUrl: './hosonguoihoc-thongtintuyensinh.component.html',
  styleUrls: ['./hosonguoihoc-thongtintuyensinh.component.scss']
})
export class HoSoNguoiHoc_ThongTinTuyenSinhComponent extends FormBase implements OnInit {
  @Input() idNguoiHoc: string;
  constructor(
    injector: Injector,
    private _danhSachTrungTuyenService: DanhSachTrungTuyenService,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
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
        text: 'TH??NG TIN TUY???N SINH',
        width: 12
      }),
      new DropdownControlSchema({
        field: 'idDotNhapHoc',
        label: '?????t nh???p h???c',
        service: this._dm_DotNhapHocService,
        required: true,
        width: 6
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
      new DropdownControlSchema({
        field: 'idNganhDangKy',
        label: 'Ng??nh ????ng k??',
        service: this._DM_NganhService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idNganhTrungTuyen',
        label: 'Ng??nh tr??ng tuy???n',
        service: this._DM_NganhService,
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
      new TextControlSchema({
        field: 'ghiChu',
        label: 'Ghi ch??',
        width: 6
      }),
    ];
  }

  override async getDetailCustom(): Promise<ResponseResult> {
    return new Promise(async (resolve, reject) => {
      const itemNguoiHoc = (await this._hoSoNguoiHocService.getDetail(this.idNguoiHoc)).data;
      if (itemNguoiHoc) {
        const itemTrungTuyen = (await this._danhSachTrungTuyenService.getDetailByFilter([
          this.newFilter('maSv', Operator.equal, itemNguoiHoc.maSv)
        ])).data;
        resolve(<any>{
          success: true,
          data: itemTrungTuyen
        });
        return;
      }
      resolve(<any>{
        success: false
      });
    });
  }
}
