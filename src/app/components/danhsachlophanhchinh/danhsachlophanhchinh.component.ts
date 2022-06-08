import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachLopHanhChinhService } from './services/danhsachlophanhchinh.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
@Component({
  selector: 'danhsachlophanhchinh',
  templateUrl: './danhsachlophanhchinh.component.html',
  styleUrls: ['./danhsachlophanhchinh.component.scss']
})
export class DanhSachLopHanhChinhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'lớp hành chính';
    this.setting.service = this._DanhSachLopHanhChinhService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên hệ',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService
      }),
      new ColumnSchema({
        field: 'soKyHieu',
        fullTextSearch: true,
        label: 'Số ký hiệu'
      }),
    ];
    super.ngOnInit();
  }
}
