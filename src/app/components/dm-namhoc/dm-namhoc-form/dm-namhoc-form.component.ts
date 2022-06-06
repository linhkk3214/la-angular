import { Component, Injector, Input, OnInit } from '@angular/core';
import { DateCompareValidator } from 'src/app/shared/base-class/validators';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DateTimeControlSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_NamHocService } from '../services/dm-namhoc.service';

@Component({
  selector: 'dm-namhoc-form',
  templateUrl: './dm-namhoc-form.component.html',
  styleUrls: ['./dm-namhoc-form.component.scss']
})
export class DM_NamHocFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_NamHocService: DM_NamHocService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_NamHocService;
    this.setting.schema = [
      new MaskControlSchema({
        field: 'nam',
        label: 'Năm học',
        autoFormat: false,
        required: true,
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'tuNgay',
        label: 'Từ ngày',
        required: true,
        width: 3
      }),
      new DateTimeControlSchema({
        field: 'denNgay',
        label: 'Đến ngày',
        required: true,
        width: 3,
        validators: [
          new DateCompareValidator(Operator.greater, 'tuNgay')
        ]
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      })
    ];
  }

  override onBeforeSave() {
    const nam = Number(this.model.data.nam);
    this.model.data.ten = `${nam} - ${nam + 1}`;
  }
}
