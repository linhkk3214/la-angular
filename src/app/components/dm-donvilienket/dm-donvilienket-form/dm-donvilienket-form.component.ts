import { Component, Injector, OnInit } from '@angular/core';
import { FileControlSchema, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_DonViLienKetService } from '../services/dm-donvilienket.service';

@Component({
  selector: 'dm-donvilienket-form',
  templateUrl: './dm-donvilienket-form.component.html',
  styleUrls: ['./dm-donvilienket-form.component.scss']
})
export class DM_DonViLienKetFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_DonViLienKetService: DM_DonViLienKetService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_DonViLienKetService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'diaChi',
        label: 'Địa chỉ'
      }),
      new TextControlSchema({
        field: 'sdt',
        label: 'Số điện thoại'
      }),
      new TextControlSchema({
        field: 'nguoiDaiDien',
        label: 'Người đại diện'
      }),
      new TextControlSchema({
        field: 'chucVu',
        label: 'Chức vụ'
      }),
      new TextControlSchema({
        field: 'soHopDong',
        label: 'Số hợp đồng'
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú ',
        width: 12
      }),
      new FileControlSchema({
        field: 'dsTaiLieu',
        label: 'Danh sách tài liệu',
        width: 12
      }),
    ];
  }
}
