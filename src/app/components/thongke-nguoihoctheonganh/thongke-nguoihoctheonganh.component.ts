import { Component, Injector, OnInit } from '@angular/core';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema, DialogModel, PopupSize } from '../../shared/models/schema';
import { DM_TrangThaiNguoiHocService } from '../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
@Component({
  selector: 'thongke-nguoihoctheonganh',
  templateUrl: './thongke-nguoihoctheonganh.component.html',
  styleUrls: ['./thongke-nguoihoctheonganh.component.scss']
})
export class ThongKe_NguoiHocTheoNganhComponent extends ListBase implements OnInit {
  xemChiTietDialogModel = new DialogModel({
    header: 'Danh sách sinh viên',
    popupSize: new PopupSize({
      maximize: true
    })
  })
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
    this.setting.title = 'Tổng hợp số lượng người học theo trạng thái và ngành đào tạo';
    this.setting.service = this._hoSoNguoiHocService;
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
    ];
    // Lấy các cột động theo trạng thái người học
    this.appendDynamicCols();
  }

  async appendDynamicCols() {
    this.lstTrangThai = (await this._dm_TrangThaiNguoiHocService.getAll()).data;
    this.lstTrangThai.forEach(itemTrangThai => {
      this.setting.cols.push(new ColumnSchema({
        field: this.getFieldCount(itemTrangThai._id),
        label: itemTrangThai.ten,
        dataType: 'countTrangThai',
        customData: {
          fieldList: itemTrangThai._id
        },
        allowFilter: false
      }))
    });
    this.ready = true;
    super.ngOnInit();
  }

  private getFieldCount(idTrangThai: string) {
    return `count_${idTrangThai}`;
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    return this._hoSoNguoiHocService.thongKeNguoiHocTheoNganh(gridInfo);
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
      lstIdNganh: [],
      lstIdNguoiHoc: []
    };
    if (datasource.length) {
      this.lstTrangThai.forEach(itemTrangThai => {
        rowDataSummary[this.getFieldCount(itemTrangThai._id)] = 0;
        rowDataSummary[itemTrangThai._id] = [];
      });
    }
    datasource.forEach(item => {
      item.lstIdNguoiHoc = [];
      this.lstTrangThai.forEach(itemTrangThai => {
        const fieldCount = this.getFieldCount(itemTrangThai._id);
        item[fieldCount] = item[itemTrangThai._id].length;
        item.lstIdNguoiHoc.push(...item[itemTrangThai._id]);

        rowDataSummary[fieldCount] += item[fieldCount];
        rowDataSummary[itemTrangThai._id].push(...item[itemTrangThai._id]);
        rowDataSummary.lstIdNguoiHoc.push(...item[itemTrangThai._id]);
      });
    });
    datasource.unshift(rowDataSummary);
  }

  viewChiTiet(rowData) {
    this.xemChiTietDialogModel.data.lstIdNguoiHoc = rowData.lstIdNguoiHoc;
    this.xemChiTietDialogModel.showEditForm = true;
  }

  viewChiTietSinhVien(lstIdNguoiHoc) {
    this.xemChiTietDialogModel.data.lstIdNguoiHoc = lstIdNguoiHoc;
    this.xemChiTietDialogModel.showEditForm = true;
  }
}
