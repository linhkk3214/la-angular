import { Component, Injector, Input, OnInit } from '@angular/core';
import { ColumnSchema, CrudFormData, DialogModel, DropdownControlSchema, PopupSize } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachSinhVienCapNhatHoSoService } from './services/danhsachsinhviencapnhathoso.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_TrinhDoDaoTaoService } from '../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
import { DM_NganhService } from '../dm-nganh/services/dm-nganh.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoCanBoService } from '../user/services/hosocanbo';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DataSourceTrangThai } from '../dotnhaphoc/models/const';
import { DataSourceTrangThaiQuyetDinh } from '../danhsachquyetdinhhoctap/models/const';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DotCapNhatHoSoNguoiHocService } from '../dotcapnhathosonguoihoc/services/dotcapnhathosonguoihoc.service';
import { DataType, FormState } from 'src/app/shared/models/enums';
import { EnumTrangThaiQuyetDinh } from '../danhsachquyetdinhhoctap/models/enums';
@Component({
  selector: 'danhsachsinhviencapnhathoso',
  templateUrl: './danhsachsinhviencapnhathoso.component.html',
  styleUrls: ['./danhsachsinhviencapnhathoso.component.scss']
})
export class DanhSachSinhVienCapNhatHoSoComponent extends ListBase implements OnInit {
  enumTrangThaiQuyetDinh = EnumTrangThaiQuyetDinh;
  @Input() idNguoiHoc: string;
  hoSoModel = new DialogModel({
    header: 'Cập nhật thông tin hồ sơ',
    popupSize: new PopupSize({
      maximize: true
    })
  })
  constructor(
    injector: Injector,
    private _danhSachSinhVienCapNhatHoSoService: DanhSachSinhVienCapNhatHoSoService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private dotCapNhatHoSoService: DotCapNhatHoSoNguoiHocService,
    private _dm_NganhService: DM_NganhService,
    private _dm_KhoaVienService: DM_KhoaVienService,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'người học cập nhật hồ sơ';
    this.setting.service = this._danhSachSinhVienCapNhatHoSoService;
    this.setting.widthFunctionColumn = '14.5rem'
    this.setting.hiddenAdd = true
    this.setting.cols = [
      new ColumnSchema({
        field: 'idDot',
        label: 'Đợt cập nhật',
        service: this.dotCapNhatHoSoService
      }),
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
        sort: false,
      }),
      new ColumnSchema({
        field: 'idNguoiHoc',
        label: 'Họ tên',
        order: 1,
        service: this._hoSoNguoiHocService,
        fieldPlus: 'maSv,idLopHanhChinh,idKhoaVien',
        displayField: 'hoVaTen',
        funcSetValueRow: (rowItem, data) => {
          rowItem.maSv = data.maSv;
          rowItem.idLopHanhChinh = data.idLopHanhChinh;
          rowItem.idKhoaVien = data.idKhoaVien;
          rowItem.idKhoaHoc = data.idKhoaHoc;
          rowItem.idNganh = data.idNganh;
        },
        sort: false
      }),
      new ColumnSchema({
        field: 'idLopHanhChinh',
        label: 'Lớp hành chính',
        order: 2,
        service: this._danhSachLopHanhChinhService,
        // allowFilter: false,
        sort: false,
      }),
      new ColumnSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        order: 3,
        service: this._dm_KhoaVienService,
        // allowFilter: false,
        sort: false
      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khoá học',
        order: 4,
        service: this._dm_KhoaHocService,
        // allowFilter: false,
        sort: false
      }),
      new ColumnSchema({
        field: 'idNganh',
        label: 'Ngành',
        order: 5,
        service: this._dm_ChuongTrinhDaoTaoService,
        // allowFilter: false,
        sort: false
      }),
      new ColumnSchema({
        field: 'idTrangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThaiQuyetDinh

      }),
      new ColumnSchema({
        field: 'created',
        label: 'Thời gian cập nhật',
        dataType: DataType.date

      }),
    ];
    super.ngOnInit();
  }
  override async beforeRenderDataSource(datasource: any): Promise<any> {
    // Trước khi render ra datasource, cần modify nó để set ẩn hiện các nút sửa/xóa trong base
    datasource.forEach(rowData => {
      rowData.hiddenEdit = true;
    });
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
        this._danhSachSinhVienCapNhatHoSoService.thayDoiTrangThai(id, idTrangThai)
          .then(res => {
            this.handleResponse(res, `${this.upperFirstLetter(actionName)} thành công`, f => {
              this._triggerProcessData();
            });
          });
      });
  }

  view(rowData: any) {
    this.hoSoModel.data.formModel = new CrudFormData();
    this.hoSoModel.data.formModel.formState = FormState.VIEW;
    this.hoSoModel.data.formModel.data = { _id: rowData.idNguoiHoc };
    this.hoSoModel.showEditForm = true;
  }
}
