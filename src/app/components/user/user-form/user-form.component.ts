import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from '../../../shared/models/enums';
import { DropdownControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TpHoSoService } from '../../dm-tphoso/services/dm-tphoso.service';
import { DM_LoaiGiayToService } from '../../dm-loaigiayto/services/dm-loaigiayto.service';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _userService: UserService,
    private _dm_LoaiGiayToService: DM_LoaiGiayToService,
    private _dm_TpHoSoService: DM_TpHoSoService,
    private _addressService: AddressService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._userService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ten',
        label: 'Họ và tên',
        required: true
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
    ];
  }
}
