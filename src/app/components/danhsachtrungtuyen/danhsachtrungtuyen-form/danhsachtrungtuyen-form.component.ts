import { Component, Injector, OnInit } from '@angular/core';
import { FormState, Operator } from 'src/app/shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, TabViewData, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_CoSoDaoTaoService } from '../../dm-cosodaotao/services/dm-cosodaotao.service';
import { DM_DonViLienKetService } from '../../dm-donvilienket/services/dm-donvilienket.service';
import { DM_GioiTinhService } from '../../dm-gioitinh/services/dm-gioitinh.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { AddressService } from '../../user/services/address.service';
import { DanTocService } from '../../user/services/dantoc.service';
import { QuocTichService } from '../../user/services/quoctich.service';
import { ReligionService } from '../../user/services/religion.service';
import { DataSourceTrangThai } from '../models/const';
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
    private _dm_DotNhapHocService: DM_HeDaoTaoService,
    private _dm_QuocTichService: QuocTichService,
    private _dm_DanTocService: DanTocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _addressService: AddressService,
    private _tongiaoService: ReligionService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DanhSachTrungTuyenService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_DotNhapHocService,
        required: true
      }),
      new TextControlSchema({
        field: 'maNhapHoc',
        label: 'Mã nhập học',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'maHoSo',
        label: 'Mã hồ sơ',
        width: 6
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
        service: this._dm_GioiTinhService
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
      new TextAreaControlSchema({
        field: 'email',
        label: 'Email',
      }),
      new DropdownControlSchema({
        field: 'idNganhDangKy',
        label: 'Tôn giáo',
        service: this._tongiaoService
      }),
      new DateTimeControlSchema({
        field: 'timeKt',
        label: 'Thời gian kết thúc'
      }),
      new DropdownControlSchema({
        field: 'idCoSoDaoTao',
        label: 'Cơ sở đào tạo'
      }),
      new DropdownControlSchema({
        field: 'idDonViLienKet',
        label: 'Đơn vị liên kết'
      }),
      new DropdownControlSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThai
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      }),
    ];
  }


}
