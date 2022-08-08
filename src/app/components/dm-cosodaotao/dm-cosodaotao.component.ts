import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_CoSoDaoTaoService } from './services/dm-cosodaotao.service';

@Component({
  selector: 'dm-cosodaotao',
  templateUrl: './dm-cosodaotao.component.html',
  styleUrls: ['./dm-cosodaotao.component.scss']
})
export class DM_CoSoDaoTaoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_CoSoDaoTaoService: DM_CoSoDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'cơ sở đào tạo';
    this.setting.service = this._dm_CoSoDaoTaoService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên cơ sở',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'diaChi',
        label: 'Địa chỉ',
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
