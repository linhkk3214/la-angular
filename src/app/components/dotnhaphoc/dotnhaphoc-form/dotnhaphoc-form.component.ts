import { Component, Injector, OnInit } from '@angular/core';
import { FormState, Operator } from 'src/app/shared/models/enums';
import { DateTimeControlSchema, DropdownControlSchema, TabViewData, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_CoSoDaoTaoService } from '../../dm-cosodaotao/services/dm-cosodaotao.service';
import { DM_DonViLienKetService } from '../../dm-donvilienket/services/dm-donvilienket.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DataSourceTrangThai } from '../models/const';
import { DotNhapHocService } from '../services/dotnhaphoc.service';

@Component({
  selector: 'dotnhaphoc-form',
  templateUrl: './dotnhaphoc-form.component.html',
  styleUrls: ['./dotnhaphoc-form.component.scss']
})
export class DotNhapHocFormComponent extends FormBase implements OnInit {
  mainTabData: any[] = [
    new TabViewData({
      code: 'thongTinChung',
      icon: 'pi pi-sliders-h',
      label: 'Thông tin chung',
      useScrollbar: true,
      alwayRender: true
    }),
    new TabViewData({
      code: 'danhSach',
      icon: 'pi pi-sliders-h',
      label: 'Danh sách'
    })
  ];
  constructor(
    injector: Injector,
    private _dotnhaphocService: DotNhapHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_CoSoDaoTaoService: DM_CoSoDaoTaoService,
    private _dm_DonViLienKetService: DM_DonViLienKetService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dotnhaphocService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService,
        required: true,
        bindingFilters: [
          this.newBindingFilter('idHeDaoTao', Operator.equal, 'idHeDaoTao')
        ],
      }),
      new TextControlSchema({
        field: 'ma',
        label: 'Mã đợt',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên đợt',
        required: true,
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'timeBd',
        label: 'Thời gian bắt đầu',
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'timeKt',
        label: 'Thời gian kết thúc'
      }),
      new DropdownControlSchema({
        field: 'idCoSoDaoTao',
        label: 'Cơ sở đào tạo',
        service: this._dm_CoSoDaoTaoService
      }),
      new DropdownControlSchema({
        field: 'idDonViLienKet',
        label: 'Đơn vị liên kết',
        service: this._dm_DonViLienKetService
      }),
      new DropdownControlSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThai
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      }),
    ];
    this.setHiddenTab();
  }

  setHiddenTab() {
    if (this.model.formState == FormState.ADD) {
      // Ẩn tab danh sách nếu là form thêm mới
      this.mainTabData[1].hidden = true;
    }
  }
}
