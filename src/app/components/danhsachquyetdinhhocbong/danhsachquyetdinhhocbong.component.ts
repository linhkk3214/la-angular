import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachQuyetDinhHocBongService } from './services/danhsachquyetdinhhocbong.service';
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
import { DanhMucHocBongService } from '../danhmuchocbong/services/danhmuchocbong.service';
import { EnumTrangThaiQuyetDinh } from '../danhsachquyetdinhhoctap/models/enums';
import { DataSourceTrangThaiQuyetDinh } from '../danhsachquyetdinhhoctap/models/const';
@Component({
  selector: 'danhsachquyetdinhhocbong',
  templateUrl: './danhsachquyetdinhhocbong.component.html',
  styleUrls: ['./danhsachquyetdinhhocbong.component.scss']
})
export class DanhSachQuyetDinhHocBongComponent extends ListBase implements OnInit {
  enumTrangThaiQuyetDinh = EnumTrangThaiQuyetDinh;
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocBongService: DanhSachQuyetDinhHocBongService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CT??TService: DM_ChuongTrinhDaoTaoService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService,
    private _danhMucHocBongService: DanhMucHocBongService,

  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'quy???t ?????nh h???c b???ng';
    this.setting.service = this._danhSachQuyetDinhHocBongService;
    this.setting.popupSize.width = 1300;
    this.setting.popupSize.height = 700;
    this.setting.widthFunctionColumn = '9.5rem'
    this.setting.cols = [
      new ColumnSchema({
        field: 'soQd',
        label: 'S??? quy???t ?????nh',
      }),
      new ColumnSchema({
        field: 'ngayQd',
        label: 'Ng??y quy???t ?????nh',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'idNamHoc',
        label: 'N??m h???c',
        service: this._dm_NamHocService,
      }),
      new ColumnSchema({
        field: 'idHocKy',
        label: 'H???c k???',
        service: this._dm_HocKyService,
      }),
      new ColumnSchema({
        field: 'idHocBong',
        label: 'H???c b???ng',
        service: this._danhMucHocBongService,
      }),
      new ColumnSchema({
        field: 'idNguoiKy',
        label: 'Ng?????i k??',
        service: this._HoSoCanBoService,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      }),
      new ColumnSchema({
        field: 'idTrangThai',
        label: 'Tr???ng th??i',
        dataSource: DataSourceTrangThaiQuyetDinh
      }),
    ];
    super.ngOnInit();
  }

  override async beforeRenderDataSource(datasource: any): Promise<any> {
    // Tr?????c khi render ra datasource, c???n modify n?? ????? set ???n hi???n c??c n??t s???a/x??a trong base
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
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiQuyetDinh.CHO_DUYET, 'g???i duy???t');
  }

  pheDuyetQuyetDinh(rowData) {
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiQuyetDinh.DA_DUYET, 'ph?? duy???t');
  }

  tuChoiQuyetDinh(rowData) {
    this.thayDoiTrangThai(rowData._id, EnumTrangThaiQuyetDinh.TU_CHOI, 't??? ch???i');
  }

  private thayDoiTrangThai(id: string, idTrangThai: number, actionName: string) {
    this.confirm(`B???n c?? ch???c ch???n mu???n ${actionName} b???n ghi`)
      .then(res => {
        if (!res) return;
        this._danhSachQuyetDinhHocBongService.thayDoiTrangThai(id, idTrangThai)
          .then(res => {
            this.handleResponse(res, `${this.upperFirstLetter(actionName)} th??nh c??ng`, f => {
              this._triggerProcessData();
            });
          });
      });
  }

  view(rowData: any) {
    this.formModel.formState = FormState.VIEW;
    this.setting.popupHeader = `Chi ti???t ${this.setting.objectName} `;
    this.formModel.data = { _id: rowData._id };
    this.showDetailForm = true;
  }
}
