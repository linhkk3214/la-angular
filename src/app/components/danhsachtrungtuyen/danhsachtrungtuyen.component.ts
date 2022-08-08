import { Component, Injector, OnInit } from '@angular/core';
import { DataType } from 'src/app/shared/models/enums';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_DoiTuongDaoTaoService } from '../dm-doituongdaotao/services/dm-doituongdaotao.service';
import { DM_GioiTinhService } from '../dm-gioitinh/services/dm-gioitinh.service';
import { DM_HtTuyenSinhService } from '../dm-httuyensinh/services/dm-httuyensinh.service';
import { DotNhapHocService } from '../dotnhaphoc/services/dotnhaphoc.service';
import { DataSourceTrangThaiHoSo } from './models/const';
import { DanhSachTrungTuyenService } from './services/danhsachtrungtuyen.service';
@Component({
  selector: 'danhsachtrungtuyen',
  templateUrl: './danhsachtrungtuyen.component.html',
  styleUrls: ['./danhsachtrungtuyen.component.scss']
})
export class DanhSachTrungTuyenComponent extends ListBase implements OnInit{
  constructor(
    injector: Injector,
    private _DanhSachTrungTuyenService: DanhSachTrungTuyenService,
    private _dm_DotNhapHocService: DotNhapHocService,
    private _dm_GioiTinhService: DM_GioiTinhService,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService,
    private _DM_HtTuyenSinhService: DM_HtTuyenSinhService,
    private _DM_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'trúng tuyển';
    this.setting.service = this._DanhSachTrungTuyenService;
    this.setting.popupSize.maximize = true;
    this.setting.widthFunctionColumn = '8.2rem';
    this.setting.cols = [
      new ColumnSchema({
        field: 'maNhapHoc',
        label: 'Mã nhập học',
      }),
      new ColumnSchema({
        field: 'hoVaTen',
        label: 'Họ và tên',
        // width: '170px'
      }),
      new ColumnSchema({
        field: 'ngaySinh',
        label: 'Ngày sinh',
        dataType: DataType.date,
        // width: '107px'
      }),
      new ColumnSchema({
        field: 'gioiTinh',
        label: 'Giới tính',
        service: this._dm_GioiTinhService,
        width: '100px'
      }),
      new ColumnSchema({
        field: 'idNganhTrungTuyen',
        label: 'Ngành trúng tuyển',
        service: this._dm_ChuongTrinhDaoTaoService,
        fieldPlus: 'soCTDT',
        funcGetLabel: (item) => `${item.soCTDT} - ${item.ten}`,
        // width: '200px'
      }),
      new ColumnSchema({
        field: 'tongDiem',
        label: 'Tổng điểm',
        width: '107px'
      }),
      new ColumnSchema({
        field: 'idHtTuyenSinh',
        label: 'Hình thức tuyển sinh',
        service: this._DM_HtTuyenSinhService,

      }),
      new ColumnSchema({
        field: 'idDotNhapHoc',
        label: 'Đợt nhập học',
        service: this._dm_DotNhapHocService,
        // width: '150px'
      }),
      new ColumnSchema({
        field: 'idDoiTuongDaoTao',
        label: 'Đối tượng đào tạo',
        service: this._DM_DoiTuongDaoTaoService,

      }),
      new ColumnSchema({
        field: 'maSv',
        label: 'Mã sinh viên',
      }),
      new ColumnSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThaiHoSo,
      }),

    ];
    super.ngOnInit();
  }
}
