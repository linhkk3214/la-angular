import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_HocLucService } from './services/dm-hocluc.service';

@Component({
  selector: 'dm-hocluc',
  templateUrl: './dm-hocluc.component.html',
  styleUrls: ['./dm-hocluc.component.scss']
})
export class DM_HocLucComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HocLucService: DM_HocLucService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'học lực';
    this.setting.service = this._dm_HocLucService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên học lực',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
