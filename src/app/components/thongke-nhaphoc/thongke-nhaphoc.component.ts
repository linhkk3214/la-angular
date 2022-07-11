import { Component, Injector, OnInit } from '@angular/core';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema, DialogModel, PopupSize } from '../../shared/models/schema';
import { DanhSachTrungTuyenService } from '../danhsachtrungtuyen/services/danhsachtrungtuyen.service';
@Component({
  selector: 'thongke-nhaphoc',
  templateUrl: './thongke-nhaphoc.component.html',
  styleUrls: ['./thongke-nhaphoc.component.scss']
})
export class ThongKe_NhapHocComponent extends ListBase implements OnInit {
  xemChiTietDialogModel = new DialogModel({
    header: 'Danh sách sinh viên trúng tuyển',
    popupSize: new PopupSize({
      maximize: true
    })
  })
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
        dataType: 'viewSinhVien',
        customData: {
          fieldList: 'lstIdSinhVienNopDu'
        },
        label: 'Nộp đủ',
        allowFilter: false
      }),
      new ColumnSchema({
        field: 'soSinhVienNopThieu',
        label: 'Nộp thiếu',
        dataType: 'viewSinhVien',
        customData: {
          fieldList: 'lstIdSinhVienNopThieu'
        },
        allowFilter: false
      }),
      new ColumnSchema({
        field: 'soSinhVienChuaNop',
        label: 'Chưa nộp',
        dataType: 'viewSinhVien',
        customData: {
          fieldList: 'lstIdSinhVienChuaNop'
        },
        allowFilter: false
      }),
      new ColumnSchema({
        field: 'soSinhVienDaRut',
        label: 'Đã rút',
        dataType: 'viewSinhVien',
        customData: {
          fieldList: 'lstIdSinhVienDaRut'
        },
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
      soSinhVienNopThieu: 0,
      lstIdNganhTrungTuyen: [],
      lstIdNguoiHoc: [],
      lstIdSinhVienNopDu: [],
      lstIdSinhVienNopThieu: [],
      lstIdSinhVienChuaNop: [],
      lstIdSinhVienDaRut: []

    };
    datasource.forEach(item => {
      item.soSinhVienChuaNop = item.lstIdSinhVienChuaNop.length;
      item.soSinhVienDaRut = item.lstIdSinhVienDaRut.length;
      item.soSinhVienNopDu = item.lstIdSinhVienNopDu.length;
      item.soSinhVienNopThieu = item.lstIdSinhVienNopThieu.length;

      item.lstIdNguoiHoc = [
        ...item.lstIdSinhVienChuaNop,
        ...item.lstIdSinhVienDaRut,
        ...item.lstIdSinhVienNopDu,
        ...item.lstIdSinhVienNopThieu
      ];

      rowDataSummary.soSinhVienChuaNop += item.soSinhVienChuaNop;
      rowDataSummary.soSinhVienDaRut += item.soSinhVienDaRut;
      rowDataSummary.soSinhVienNopDu += item.soSinhVienNopDu;
      rowDataSummary.soSinhVienNopThieu += item.soSinhVienNopThieu;
      rowDataSummary.lstIdNganhTrungTuyen.push(item.id);
      rowDataSummary.lstIdSinhVienNopDu.push(...item.lstIdSinhVienNopDu);
      rowDataSummary.lstIdSinhVienNopThieu.push(...item.lstIdSinhVienNopThieu);
      rowDataSummary.lstIdSinhVienChuaNop.push(...item.lstIdSinhVienChuaNop);
      rowDataSummary.lstIdSinhVienDaRut.push(...item.lstIdSinhVienDaRut);
      rowDataSummary.lstIdNguoiHoc.push(...item.lstIdNguoiHoc);
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
