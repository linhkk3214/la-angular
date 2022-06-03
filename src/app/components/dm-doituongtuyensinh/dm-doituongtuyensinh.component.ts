import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_DoiTuongTuyenSinhService } from './services/dm-doituongtuyensinh.service';

@Component({
  selector: 'dm-doituongtuyensinh',
  templateUrl: './dm-doituongtuyensinh.component.html',
  styleUrls: ['./dm-doituongtuyensinh.component.scss']
})
export class DM_DoiTuongTuyenSinhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_DoiTuongTuyenSinhService: DM_DoiTuongTuyenSinhService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đối tượng tuyển sinh';
    this.setting.service = this._dm_DoiTuongTuyenSinhService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên đối tượng',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
