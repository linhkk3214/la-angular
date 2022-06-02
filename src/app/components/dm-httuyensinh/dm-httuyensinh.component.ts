import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_HtTuyenSinhService } from './services/dm-httuyensinh.service';

@Component({
  selector: 'dm-httuyensinh',
  templateUrl: './dm-httuyensinh.component.html',
  styleUrls: ['./dm-httuyensinh.component.scss']
})
export class DM_HtTuyenSinhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HtTuyenSinhService: DM_HtTuyenSinhService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'hình thức tuyển sinh';
    this.setting.service = this._dm_HtTuyenSinhService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên hình thức',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
