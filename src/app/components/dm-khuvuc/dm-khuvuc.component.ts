import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_KhuVucService } from './services/dm-khuvuc.service';

@Component({
  selector: 'dm-khuvuc',
  templateUrl: './dm-khuvuc.component.html',
  styleUrls: ['./dm-khuvuc.component.scss']
})
export class DM_KhuVucComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_KhuVucService: DM_KhuVucService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'khu vực';
    this.setting.service = this._dm_KhuVucService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên khu vực',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
