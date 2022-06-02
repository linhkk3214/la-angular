import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from '../../../shared/models/enums';
import { DropdownControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TpHoSoService } from '../../dm-tphoso/services/dm-tphoso.service';
import { DM_LoaiGiayToService } from '../../dm-loaigiayto/services/dm-loaigiayto.service';
import { UserService } from '../services/user.service';

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
    private _dm_TpHoSoService: DM_TpHoSoService
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
        field: 'idLoai',
        label: 'Loại người dùng',
        service: this._dm_LoaiGiayToService
      }),
      new DropdownControlSchema({
        field: 'idtphoso',
        label: 'Chức vụ',
        service: this._dm_TpHoSoService,
        bindingFilters: [
          this.newBindingFilter('idLoaigiayto', Operator.equal, 'idLoai')
        ]
      }),
      new DropdownControlSchema({
        field: 'idtphosoKiemNhiem',
        label: 'Chức vụ kiêm nhiệm',
        multiple: true,
        service: this._dm_TpHoSoService,
        bindingFilters: [
          this.newBindingFilter('idLoaigiayto', Operator.equal, 'idLoai')
        ]
      }),
    ];
  }
}
