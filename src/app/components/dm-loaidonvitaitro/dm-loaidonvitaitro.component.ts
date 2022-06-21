import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_LoaiDonViTaiTroService } from './services/dm-loaidonvitaitro.service';

@Component({
  selector: 'dm-loaidonvitaitro',
  templateUrl: './dm-loaidonvitaitro.component.html',
  styleUrls: ['./dm-loaidonvitaitro.component.scss']
})
export class DM_LoaiDonViTaiTroComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_LoaiDonViTaiTroService: DM_LoaiDonViTaiTroService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'loại đơn vị tài trợ';
    this.setting.service = this._dm_LoaiDonViTaiTroService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã loại',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên loại đơn vị',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
