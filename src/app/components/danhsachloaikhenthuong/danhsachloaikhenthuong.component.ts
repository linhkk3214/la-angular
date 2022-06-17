import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachLoaiKhenThuongService } from './services/danhsachloaikhenthuong.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
@Component({
  selector: 'danhsachloaikhenthuong',
  templateUrl: './danhsachloaikhenthuong.component.html',
  styleUrls: ['./danhsachloaikhenthuong.component.scss']
})
export class DanhSachLoaiKhenThuongComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'loại khen thưởng';
    this.setting.service = this._DanhSachLoaiKhenThuongService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên loại khen thưởng',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'soTien',
        label: 'Số tiền',
        dataType: 'int'
      }),
      new ColumnSchema({
        field: 'ghiChu',
        fullTextSearch: true,
        label: 'Ghi chú'
      }),
    ];
    super.ngOnInit();
  }
}
