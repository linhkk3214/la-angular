import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListBase } from 'src/app/shared/base-class/list-base';
import { Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ColumnSchema } from 'src/app/shared/models/schema';
import { DanhSachTrungTuyenService } from '../../danhsachtrungtuyen/services/danhsachtrungtuyen.service';
@Component({
  selector: 'hosonguoihoc-thongtintuyensinh',
  templateUrl: './hosonguoihoc-thongtintuyensinh.component.html',
  styleUrls: ['./hosonguoihoc-thongtintuyensinh.component.scss']
})
export class HoSoNguoiHoc_ThongTinTuyenSinhComponent extends ListBase implements OnInit {
  @Input() idNguoiHoc: string;
  constructor(
    injector: Injector,
    private _danhSachTrungTuyenService: DanhSachTrungTuyenService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'thông tin tuyển sinh';
    this.setting.service = this._danhSachTrungTuyenService;
    this.setting.hiddenPageTitle = true;
    this.setting.hiddenAdd = true;
    this.setting.hiddenDelete = true;
    this.setting.hiddenFunctionColumn = true;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'maNhapHoc',
        label: 'Mã nhập học',
        fullTextSearch: true

      }),
      new ColumnSchema({
        field: 'hoVaTen',
        label: 'Họ và tên'
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
