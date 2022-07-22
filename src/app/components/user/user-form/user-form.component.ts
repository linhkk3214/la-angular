import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from '../../../shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, FileControlSchema, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import { DanTocService } from '../services/dantoc.service';
import { ReligionService } from '../services/religion.service';
import { QuocTichService } from '../services/quoctich.service';
import { DM_GioiTinhService } from '../../dm-gioitinh/services/dm-gioitinh.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _userService: UserService,
    private _addressService: AddressService,
    private _dantocService: DanTocService,
    private _tongiaoService: ReligionService,
    private _quoctichService: QuocTichService,
    private _dm_GioiTinhService: DM_GioiTinhService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._userService;
    this.setting.schema = [
      new FileControlSchema({
        field: 'avatar',
        label: 'Ảnh đại diện',
        centerLabel: true,
        multiple: false,
        isAvatar: true,
        width: 3,
        rowSpan: 5
      }),
      new TextControlSchema({
        field: 'ho',
        label: 'Họ',
        required: true,
        width: 3
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'username',
        label: 'Tên đăng nhập',
        required: true,
        width: 3
      }),
      new TextControlSchema({
        field: 'password',
        label: 'Mật khẩu',
        dataFormat: 'password',
        required: true,
        width: 3
      }),
      new DropdownControlSchema({
        field: 'gioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
        width: 3
      }),
      new DateTimeControlSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
        width: 3
      }),
      new TextControlSchema({
        field: 'sdt',
        label: 'Số điện thoại',
        width: 3
      }),
      new TextControlSchema({
        field: 'email',
        label: 'Thư điện tử',
        width: 3
      }),
      new DropdownControlSchema({
        field: 'idTinh',
        label: 'Tỉnh / Thành phố',
        width: 3,
        service: this._addressService,
        defaultFilters: [
          this.newFilter('level', Operator.equal, 1)
        ]
      }),
      new DropdownControlSchema({
        field: 'idHuyen',
        width: 3,
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
        width: 3,
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
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 9
      }),
    ];
  }
}
