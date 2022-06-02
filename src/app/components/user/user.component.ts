import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { UserService } from './services/user.service';
import { DM_LoaiGiayToService } from '../dm-loaigiayto/services/dm-loaigiayto.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _userService: UserService,
    private _dm_LoaiGiayToService: DM_LoaiGiayToService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'người dùng';
    this.setting.service = this._userService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ten',
        label: 'Họ và tên',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'username',
        label: 'Tên đăng nhập',
        width: '140px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idLoai',
        label: 'Loại người dùng',
        width: '140px',
        service: this._dm_LoaiGiayToService
      }),
    ];
    super.ngOnInit();
  }
}
