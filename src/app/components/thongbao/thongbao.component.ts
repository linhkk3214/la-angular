import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { ThongBaoService } from './services/thongbao.service';
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
import { DataType } from 'src/app/shared/models/enums';
import { DM_LoaiDonViTaiTroService } from '../dm-loaidonvitaitro/services/dm-loaidonvitaitro.service';
import { DataSourceLoaiThongBao, DataSourceMucDoThongBao } from './models/const';
@Component({
  selector: 'thongbao',
  templateUrl: './thongbao.component.html',
  styleUrls: ['./thongbao.component.scss']
})
export class ThongBaoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _thongBaoService: ThongBaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'thông báo';
    this.setting.service = this._thongBaoService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'tieuDe',
        label: 'Tiêu đề',
      }),
      new ColumnSchema({
        field: 'ngayPhatHanh',
        label: 'Ngày phát hành',
        dataType: DataType.date,
        width: '150px'
      }),
      new ColumnSchema({
        field: 'idLoaiThongBao',
        label: 'Loại thông báo',
        dataSource: DataSourceLoaiThongBao,
        width: '300px'
      }),
      new ColumnSchema({
        field: 'idMucDoThongBao',
        label: 'Mức độ thông báo',
        dataSource: DataSourceMucDoThongBao,
        width: '170px'
      }),
      new ColumnSchema({
        field: 'moTaNgan',
        label: 'Mô tả ngắn'
      }),
    ];
    super.ngOnInit();
  }
}
