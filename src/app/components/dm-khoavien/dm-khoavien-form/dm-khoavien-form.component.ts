import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_KhoaVienService } from '../services/dm-khoavien.service';

@Component({
  selector: 'dm-khoavien-form',
  templateUrl: './dm-khoavien-form.component.html',
  styleUrls: ['./dm-khoavien-form.component.scss']
})
export class DM_KhoaVienFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_KhoaVienService: DM_KhoaVienService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_KhoaVienService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên khoa viện',
        required: true,
        width: 6
      }),
    ];
  }
}
