import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_KhoaVienService } from './services/dm-khoavien.service';

@Component({
  selector: 'dm-khoavien',
  templateUrl: './dm-khoavien.component.html',
  styleUrls: ['./dm-khoavien.component.scss']
})
export class DM_KhoaVienComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_KhoaVienService: DM_KhoaVienService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'khoa viện';
    this.setting.service = this._dm_KhoaVienService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên khoa viện',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
