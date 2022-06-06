import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_ChuongTrinhDaoTaoService } from './services/dm-chuongtrinhdaotao.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_TrinhDoDaoTaoService } from '../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
import { DM_NganhService } from '../dm-nganh/services/dm-nganh.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
@Component({
  selector: 'dm-chuongtrinhdaotao',
  templateUrl: './dm-chuongtrinhdaotao.component.html',
  styleUrls: ['./dm-chuongtrinhdaotao.component.scss']
})
export class DM_ChuongTrinhDaoTaoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_ChuongTrinhDaoTaoService: DM_ChuongTrinhDaoTaoService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_TrinhDoDaoTaoService: DM_TrinhDoDaoTaoService,
    private _dm_NganhService: DM_NganhService,
    private _dm_KhoaVienService: DM_KhoaVienService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'chương trình đào tạo';
    this.setting.service = this._dm_ChuongTrinhDaoTaoService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService
      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService
      }),
      new ColumnSchema({
        field: 'idTrinhDoDaoTao',
        label: 'Trình độ đào tạo',
        service: this._dm_TrinhDoDaoTaoService
      }),
      new ColumnSchema({
        field: 'idNganh',
        label: 'Ngành đào tạo',
        service: this._dm_NganhService
      }),
      new ColumnSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện phụ trách',
        service: this._dm_KhoaVienService
      }),
      new ColumnSchema({
        field: 'soCTDT',
        fullTextSearch: true,
        label: 'Số chương trình đào tạo'
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên chương trình đào tạo',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'tongTC',
        label: 'Tổng số tín chỉ'
      }),
      new ColumnSchema({
        field: 'soNamDT',
        label: 'Số năm đào tạo'
      }),
      new ColumnSchema({
        field: 'soNamDTmax',
        label: 'Số năm đào tạo tối đa'
      })
    ];
    super.ngOnInit();
  }
}
