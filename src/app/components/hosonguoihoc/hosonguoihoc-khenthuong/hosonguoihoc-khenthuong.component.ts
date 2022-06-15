import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListBase } from 'src/app/shared/base-class/list-base';
import { Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ColumnSchema } from 'src/app/shared/models/schema';
import { DanhSachLoaiKhenThuongService } from '../../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhSachQuyetDinhKhenThuongService } from '../../danhsachquyetdinhkhenthuong/services/danhsachquyetdinhkhenthuong.service';
@Component({
  selector: 'hosonguoihoc-khenthuong',
  templateUrl: './hosonguoihoc-khenthuong.component.html',
  styleUrls: ['./hosonguoihoc-khenthuong.component.scss']
})
export class HoSoNguoiHoc_KhenThuongComponent extends ListBase implements OnInit {
  @Input() idNguoiHoc: string;
  constructor(
    injector: Injector,
    private _DanhSachQuyetDinhKhenThuongService: DanhSachQuyetDinhKhenThuongService,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'khen thưởng';
    this.setting.service = this._DanhSachQuyetDinhKhenThuongService;
    this.setting.hiddenPageTitle = true;
    this.setting.hiddenAdd = true;
    this.setting.hiddenDelete = true;
    this.setting.hiddenFunctionColumn = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'soQd',
        label: 'Số quyết định',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idLoaiKhenThuong',
        label: 'Loại khen thưởng',
        service: this._DanhSachLoaiKhenThuongService
      }),
    ];
    super.ngOnInit();
  }

  override async modifyGridInfo(gridInfo: GridInfo): Promise<boolean | void> {
    gridInfo.filters.push(
      this.newFilter('lstIdNguoiHoc', Operator.in, this.idNguoiHoc)
    );
  }
}
