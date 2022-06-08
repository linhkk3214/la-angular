import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DanhSachLopHanhChinhService } from '../services/danhsachlophanhchinh.service';

@Component({
  selector: 'danhsachlophanhchinh-form',
  templateUrl: './danhsachlophanhchinh-form.component.html',
  styleUrls: ['./danhsachlophanhchinh-form.component.scss']
})
export class DanhSachLopHanhChinhFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DanhSachLopHanhChinhService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên đối tượng',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        required: true,
        service: this._dm_HeDaoTaoService
      }),
      new TextControlSchema({
        field: 'soKyHieu',
        label: 'Số ký hiệu'
      })
    ];
  }
}
