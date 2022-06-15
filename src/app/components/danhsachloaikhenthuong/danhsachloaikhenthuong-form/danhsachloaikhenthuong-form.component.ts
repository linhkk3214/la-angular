import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DanhSachLoaiKhenThuongService } from '../services/danhsachloaikhenthuong.service';

@Component({
  selector: 'danhsachloaikhenthuong-form',
  templateUrl: './danhsachloaikhenthuong-form.component.html',
  styleUrls: ['./danhsachloaikhenthuong-form.component.scss']
})
export class DanhSachLoaiKhenThuongFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DanhSachLoaiKhenThuongService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên loại khen thưởng',
        required: true,
        width: 6
      }),
      new MaskControlSchema({
        field: 'soTien',
        label: 'Số tiền',
        suffix: 'đồng',
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      })
    ];
  }
}
