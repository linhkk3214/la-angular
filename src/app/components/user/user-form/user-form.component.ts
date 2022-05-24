import { Component, Injector, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _userService: UserService,
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
        required: true
      }),
    ];
  }
}
