import { Component, Injector, OnInit } from '@angular/core';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DM_TrangThaiNguoiHocService } from '../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
@Component({
  selector: 'thongke-nguoihoctheokhoa',
  templateUrl: './thongke-nguoihoctheokhoa.component.html',
  styleUrls: ['./thongke-nguoihoctheokhoa.component.scss']
})
export class ThongKe_NguoiHocTheoKhoaComponent extends ListBase implements OnInit {
  ready = false;
  lstTrangThai: any[];
  constructor(
    injector: Injector,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.title = 'Tổng hợp số lượng người học theo trạng thái và khóa học';
    this.setting.service = this._hoSoNguoiHocService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.hiddenAdd = true
    this.setting.cols = [
      new ColumnSchema({
        field: 'ten',
        label: 'Khóa học',
        fullTextSearch: true,
        sort: false
      }),
    ];
    // Lấy các cột động theo trạng thái người học
    this.appendDynamicCols();
  }

  async appendDynamicCols() {
    this.lstTrangThai = (await this._dm_TrangThaiNguoiHocService.getAll()).data;
    this.lstTrangThai.forEach(itemTrangThai => {
      this.setting.cols.push(new ColumnSchema({
        field: itemTrangThai._id,
        label: itemTrangThai.ten,
        dataType: 'int',
        allowFilter: false
      }))
    });
    this.ready = true;
    super.ngOnInit();
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    return this._hoSoNguoiHocService.thongKeNguoiHocTheoKhoa(gridInfo);
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    const rowDataSummary = {
      generated: true, // Đánh dấu bằng true để ngăn base đánh index cho dòng này
      class: 'row-summary',
      ten: 'Tổng số'
    };
    if (datasource.length) {
      this.lstTrangThai.forEach(itemTrangThai => {
        rowDataSummary[itemTrangThai._id] = 0;
      });
    }
    datasource.forEach(item => {
      this.lstTrangThai.forEach(itemTrangThai => {
        rowDataSummary[itemTrangThai._id] += item[itemTrangThai._id] ?? 0;
      });
    });
    datasource.unshift(rowDataSummary);
  }
}
