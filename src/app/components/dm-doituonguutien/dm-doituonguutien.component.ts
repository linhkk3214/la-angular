import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_DoiTuongUuTienService } from './services/dm-doituonguutien.service';

@Component({
  selector: 'dm-doituonguutien',
  templateUrl: './dm-doituonguutien.component.html',
  styleUrls: ['./dm-doituonguutien.component.scss']
})
export class DM_DoiTuongUuTienComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_DoiTuongUuTienService: DM_DoiTuongUuTienService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đối tượng ưu tiên';
    this.setting.service = this._dm_DoiTuongUuTienService;
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
