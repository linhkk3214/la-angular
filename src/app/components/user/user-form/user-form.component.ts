import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { DropdownControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_ChucVuService } from '../../dm-chucvu/services/dm-chucvu.service';
import { DM_LoaiNguoiDungService } from '../../dm-loainguoidung/services/dm-loainguoidung.service';
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
    private _dm_LoaiNguoiDungService: DM_LoaiNguoiDungService,
    private _dm_ChucVuService: DM_ChucVuService
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
        service: this._dm_LoaiNguoiDungService
      }),
      new DropdownControlSchema({
        field: 'idChucVu',
        label: 'Chức vụ',
        service: this._dm_ChucVuService,
        bindingFilters: [
          this.newBindingFilter('idLoaiNguoiDung', Operator.equal, 'idLoai')
        ]
      }),
      new DropdownControlSchema({
        field: 'idChucVuKiemNhiem',
        label: 'Chức vụ kiêm nhiệm',
        multiple: true,
        service: this._dm_ChucVuService,
        bindingFilters: [
          this.newBindingFilter('idLoaiNguoiDung', Operator.equal, 'idLoai')
        ]
      }),
    ];
  }
}
