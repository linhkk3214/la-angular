import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_HanhKiemService } from './services/dm-hanhkiem.service';

@Component({
  selector: 'dm-hanhkiem',
  templateUrl: './dm-hanhkiem.component.html',
  styleUrls: ['./dm-hanhkiem.component.scss']
})
export class DM_HanhKiemComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HanhKiemService: DM_HanhKiemService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'hạnh kiểm';
    this.setting.service = this._dm_HanhKiemService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên hạnh kiểm',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
