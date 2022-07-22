import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachQuyetDinhHocTapService } from './services/danhsachquyetdinhhoctap.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoCanBoService } from '../user/services/hosocanbo';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_NganhService } from '../dm-nganh/services/dm-nganh.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
import { DM_HocKyService } from '../dm-hocky/services/dm-hocky.service';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';
import { DataType, FormState } from 'src/app/shared/models/enums';
import { DanhSachLoaiKhenThuongService } from '../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhSachLoaiQuyetDinhService } from '../danhsachloaiquyetdinh/services/danhsachloaiquyetdinh.service';
import { DataSourceTrangThaiQuyetDinh } from './models/const';
import { EnumTrangThaiQuyetDinh } from './models/enums';
@Component({
  selector: 'DanhSachQuyetDinhHocTap',
  templateUrl: './danhsachquyetdinhhoctap.component.html',
  styleUrls: ['./danhsachquyetdinhhoctap.component.scss']
})
export class DanhSachQuyetDinhHocTapComponent extends ListBase implements OnInit {
  enumTrangThaiQuyetDinh = EnumTrangThaiQuyetDinh;
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocTapService: DanhSachQuyetDinhHocTapService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
    private _danhSachLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'quyết định học tập';
    this.setting.service = this._danhSachQuyetDinhHocTapService;
    this.setting.widthFunctionColumn = '9.5rem'
    this.setting.popupSize.width = 1300;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'soQd',
        label: 'Số quyết định',
      }),
      new ColumnSchema({
        field: 'ngayBanHanh',
        label: 'Ngày ban hành',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'idLoaiQuyetDinh',
        label: 'Loại quyết định',
        service: this._danhSachLoaiQuyetDinhService,
      }),
      new ColumnSchema({
        field: 'idNguoiKy',
        label: 'Người ký',
        service: this._HoSoCanBoService,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      }),
      new ColumnSchema({
        field: 'ngayHieuLuc',
        label: 'Ngày hiệu lực',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'idTrangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThaiQuyetDinh
      }),
    ];
    super.ngOnInit();
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    // Trước khi render ra datasource, cần modify nó để set ẩn hiện các nút sửa/xóa trong base
    datasource.forEach(rowData => {
      if (rowData.idTrangThai != EnumTrangThaiQuyetDinh.MOI_TAO) {
        rowData.hiddenDelete = true;

      }
      if (rowData.idTrangThai != EnumTrangThaiQuyetDinh.DA_DUYET && rowData.idTrangThai != EnumTrangThaiQuyetDinh.MOI_TAO) {
        rowData.hiddenEdit = true;
      }
    });
  }

  guiDuyetQuyetDinh(rowData) {
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiQuyetDinh.CHO_DUYET, 'gửi duyệt');
  }

  pheDuyetQuyetDinh(rowData) {
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiQuyetDinh.DA_DUYET, 'phê duyệt');
  }

  tuChoiQuyetDinh(rowData) {
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiQuyetDinh.TU_CHOI, 'từ chối');
  }

  private thayDoiTrangThai(id: string, idTrangThai: number, actionName: string) {
    this.confirm(`Bạn có chắc chắn muốn ${actionName} bản ghi`)
      .then(res => {
        if (!res) return;
        this._danhSachQuyetDinhHocTapService.thayDoiTrangThai(id, idTrangThai)
          .then(res => {
            this.handleResponse(res, `${this.upperFirstLetter(actionName)} thành công`, f => {
              this._triggerProcessData();
            });
          });
      });
  }

  view(rowData: any) {
    this.formModel.formState = FormState.VIEW;
    this.setting.popupHeader = `Chi tiết ${this.setting.objectName} `;
    this.formModel.data = { _id: rowData._id };
    this.showDetailForm = true;
  }
}
