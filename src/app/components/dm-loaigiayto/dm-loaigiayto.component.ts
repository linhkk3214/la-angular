import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_LoaiGiayToService } from './services/dm-loaigiayto.service';

@Component({
  selector: 'dm-loaigiayto',
  templateUrl: './dm-loaigiayto.component.html',
  styleUrls: ['./dm-loaigiayto.component.scss']
})
export class DM_LoaiGiayToComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_LoaiGiayToService: DM_LoaiGiayToService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'loại giấy tờ';
    this.setting.service = this._dm_LoaiGiayToService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã loại',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên loại',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
