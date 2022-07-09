import { Component, Injector, OnInit } from '@angular/core';
import { FormState } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ResponseResult } from 'src/app/shared/models/response-result';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema, CrudFormData, DialogModel, PopupSize } from '../../shared/models/schema';
import { DanhSachDangKyHocNganh2Service } from '../danhsachdangkyhocnganh2/services/danhsachdangkyhocnganh2.service';
import { DanhSachTrungTuyenService } from '../danhsachtrungtuyen/services/danhsachtrungtuyen.service';
import { EnumTypeGetData } from './models/enums';
@Component({
  selector: 'thongke-sinhviennganh2',
  templateUrl: './thongke-sinhviennganh2.component.html',
  styleUrls: ['./thongke-sinhviennganh2.component.scss']
})
export class ThongKe_SinhVienNganh2Component extends ListBase implements OnInit {
  xemChiTietDialogModel = new DialogModel({
    header: 'Danh sách sinh viên đăng ký học ngành 2',
    popupSize: new PopupSize({
      maximize: true
    })
  })
  type: EnumTypeGetData = EnumTypeGetData.THEO_DON_VI_QL_NGANH_2;
  enumTypeGetData = EnumTypeGetData;
  constructor(
    injector: Injector,
    private _danhSachDangKyHocNganh2: DanhSachDangKyHocNganh2Service
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.title = 'Thống kê sinh viên đăng ký học ngành 2';
    this.setting.service = this._danhSachDangKyHocNganh2;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.hiddenAdd = true
    this.setting.cols = [
      new ColumnSchema({
        field: 'ten',
        label: 'Khoa Viện',
        fullTextSearch: true,
        sort: false
      }),
      new ColumnSchema({
        field: 'soSinhVienDkNganh2',
        label: 'Số sinh viên đăng ký học ngành 2',
      }),
    ];

    super.ngOnInit();
  }

  override getPromiseGetData(gridInfo: GridInfo): Promise<ResponseResult> {
    if (this.type == EnumTypeGetData.THEO_DON_VI_QL_NGANH_1) {
      return this._danhSachDangKyHocNganh2.thongKeSinhVienNganh2Dv1(gridInfo);
    }
    else {
      return this._danhSachDangKyHocNganh2.thongKeSinhVienNganh2Dv2(gridInfo);
    }
  }

  handleChangeTypeView(type: number) {
    this._triggerProcessData();
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    const rowDataSummary = {
      generated: true, // Đánh dấu bằng true để ngăn base đánh index cho dòng này
      class: 'row-summary',
      ten: 'Tổng số',
      soSinhVienDkNganh2: 0,
      lstIdKhoaVien: [],
      lstIdNguoiHoc: []
    };
    datasource.forEach(item => {
      item.soSinhVienDkNganh2 = item.lstIdNguoiHoc.length;
      rowDataSummary.soSinhVienDkNganh2 += item.soSinhVienDkNganh2;
      rowDataSummary.lstIdKhoaVien.push(item.id);
      rowDataSummary.lstIdNguoiHoc.push(...item.lstIdNguoiHoc);
    });
    datasource.unshift(rowDataSummary);
  }

  viewChiTiet(rowData) {
    this.xemChiTietDialogModel.data.lstIdNguoiHoc = rowData.lstIdNguoiHoc;
    this.xemChiTietDialogModel.showEditForm = true;
  }
}
