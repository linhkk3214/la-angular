import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from '../../../shared/models/enums';
import { DropdownControlSchema, FileControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import { DanTocService } from '../services/dantoc.service';
import { ReligionService } from '../services/religion.service';
import { QuocTichService } from '../services/quoctich.service';

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
    private _quoctichService: QuocTichService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._userService;
    this.setting.schema = [
      new FileControlSchema({
        field: 'avatar',
        label: 'Ảnh đại diện',
        multiple: false,
        isAvatar: true
      }),
      new TextControlSchema({
        field: 'ho',
        label: 'Họ',
        required: true,
        width: 4
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        required: true,
        width: 2
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
      new DropdownControlSchema({
        field: 'idDanToc',
        label: 'Dân tộc',
        service: this._dantocService
      }),
      new DropdownControlSchema({
        field: 'idTonGiao',
        label: 'Tôn giáo',
        service: this._tongiaoService
      }),
      new DropdownControlSchema({
        field: 'idQuocTich',
        label: 'Quốc tịch',
        service: this._quoctichService
      }),

    ];
  }
}
