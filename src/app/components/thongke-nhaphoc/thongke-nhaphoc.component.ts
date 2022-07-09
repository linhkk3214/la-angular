import { Component, Injector, OnInit } from '@angular/core';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DanhSachTrungTuyenService } from '../danhsachtrungtuyen/services/danhsachtrungtuyen.service';
@Component({
  selector: 'thongke-nhaphoc',
  templateUrl: './thongke-nhaphoc.component.html',
  styleUrls: ['./thongke-nhaphoc.component.scss']
})
export class ThongKe_NhapHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachTrungTuyenService: DanhSachTrungTuyenService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.title = 'Danh sách thống kê nhập học';
    this.setting.service = this._DanhSachTrungTuyenService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.hiddenAdd = true
    this.setting.cols = [
      new ColumnSchema({
        field: 'soCTDT',
        label: 'Mã ngành',
        fullTextSearch: true,
        sort: false
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên ngành',
        fullTextSearch: true,
        sort: false,
      }),
      new ColumnSchema({
        field: 'soSinhVienNopDu',
        label: 'Nộp đủ',
        dataType: 'int',
        allowFilter: false
      }),
      new ColumnSchema({
        field: 'soSinhVienNopThieu',
        label: 'Nộp thiếu',
        dataType: 'int',
        allowFilter: false
      }),
      new ColumnSchema({
        field: 'soSinhVienChuaNop',
        label: 'Chưa nộp',
        dataType: 'int',
        allowFilter: false
      }),
      new ColumnSchema({
        field: 'soSinhVienDaRut',
        label: 'Đã rút',
        dataType: 'int',
        allowFilter: false
      }),
    ];

    super.ngOnInit();
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    return this._DanhSachTrungTuyenService.thongKe(gridInfo);
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    const rowDataSummary = {
      generated: true, // Đánh dấu bằng true để ngăn base đánh index cho dòng này
      class: 'row-summary',
      colSpan: {
        soCTDT: 2
      },
      hidden: {
        ten: true
      },
      soCTDT: 'Tổng số',
      soSinhVienChuaNop: 0,
      soSinhVienDaRut: 0,
      soSinhVienNopDu: 0,
      soSinhVienNopThieu: 0
    };
    datasource.forEach(item => {
      rowDataSummary.soSinhVienChuaNop += item.soSinhVienChuaNop;
      rowDataSummary.soSinhVienDaRut += item.soSinhVienDaRut;
      rowDataSummary.soSinhVienNopDu += item.soSinhVienNopDu;
      rowDataSummary.soSinhVienNopThieu += item.soSinhVienNopThieu;
    });
    datasource.unshift(rowDataSummary);
  }
}
