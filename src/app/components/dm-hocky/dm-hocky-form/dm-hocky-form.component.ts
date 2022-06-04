import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DataSourceLoaiHocKy } from '../models/const';
import { DM_HocKyService } from '../services/dm-hocky.service';

@Component({
  selector: 'dm-hocky-form',
  templateUrl: './dm-hocky-form.component.html',
  styleUrls: ['./dm-hocky-form.component.scss']
})
export class DM_HocKyFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_NamHocService: DM_NamHocService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_HocKyService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        required: true,
        width: 6,
        service: this._dm_NamHocService,
        // MẶc định nó sẽ lấy trường 'ten' để hiển thị
        // Nếu k có trường ten trong model thì e phải khai báo trường e muốn sử dụng để hiển thị
        // NẾu k nó sẽ bị lỗi như e thấy
        displayField: 'namHoc'
      }),
      new TextControlSchema({
        field: 'hocKy',
        label: 'Học kỳ',
        required: true,
        width: 6,

      }),
      new TextControlSchema({
        field: 'tenHocKy',
        label: 'Tên học kỳ',
        required: true
      }),
      new TextControlSchema({
        field: 'tenRutGon',
        label: 'Tên rút gọn'
      }),
      new DateTimeControlSchema({
        field: 'tuNgay',
        label: 'Từ ngày',
        required: true
      }),
      new DateTimeControlSchema({
        field: 'denNgay',
        label: 'Đến ngày',
        required: true
      }),
      new DropdownControlSchema({
        field: 'loaiHocKy',
        label: 'Loại học kỳ',
        dataSource: DataSourceLoaiHocKy,
        required: true
      })
    ];
  }
}
