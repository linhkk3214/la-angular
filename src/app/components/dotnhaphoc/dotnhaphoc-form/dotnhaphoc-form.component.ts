import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormState, Operator, TextAlign } from 'src/app/shared/models/enums';
import { CheckBoxControlSchema, DateTimeControlSchema, DropdownControlSchema, EventData, MaskControlSchema, TableControlSchema, TabViewData, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_CoSoDaoTaoService } from '../../dm-cosodaotao/services/dm-cosodaotao.service';
import { DM_DonViLienKetService } from '../../dm-donvilienket/services/dm-donvilienket.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_TpHoSoService } from '../../dm-tphoso/services/dm-tphoso.service';
import { DotNhapHoc_TpHoSo_DanhSachFormComponent } from '../dotnhaphoc-tphoso-danhsach-form/dotnhaphoc-tphoso-danhsach-form.component';
import { DataSourceTrangThai } from '../models/const';
import { DotNhapHoc_TpHoSoService } from '../services/dotnhaphoc-tphoso.service';
import { DotNhapHocService } from '../services/dotnhaphoc.service';

@Component({
  selector: 'dotnhaphoc-form',
  templateUrl: './dotnhaphoc-form.component.html',
  styleUrls: ['./dotnhaphoc-form.component.scss']
})
export class DotNhapHocFormComponent extends FormBase implements OnInit {
  @ViewChild(DotNhapHoc_TpHoSo_DanhSachFormComponent) danhSachForm: DotNhapHoc_TpHoSo_DanhSachFormComponent;
  defaultSettings: any = {};
  activeIndex: number = 0;
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
      label: 'Thành phần hồ sơ',
      useScrollbar: true,
    })
  ];
  constructor(
    injector: Injector,
    private _dotNhapHocService: DotNhapHocService,
    private _dotNhapHoc_TpHoSoService: DotNhapHoc_TpHoSoService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_CoSoDaoTaoService: DM_CoSoDaoTaoService,
    private _dm_DonViLienKetService: DM_DonViLienKetService,
    private _dm_TpHoSoService: DM_TpHoSoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dotNhapHocService;
    this.defaultSettings = this.getDefaultSetting();
    let coValueHeDaoTao = false;
    if (this.defaultSettings) {
      coValueHeDaoTao = true;
    }
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
        required: true,
        defaultValue: this.defaultSettings ? this.defaultSettings.idHeDaoTao : null,
        disabled: !!this.defaultSettings,
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
  }

  override async validateForm(baseValidate: boolean) {
    if (!this.danhSachForm) {
      return false;
    }
    const resultValidateDanhSach = await this.danhSachForm._getResultValidate();
    if (!resultValidateDanhSach) {
      if (baseValidate) {
        this.activeIndex = 1;
      }
      return false;
    }
    return true;
  }

  override onBeforeSave() {
    // Lấy dữ liệu danh sách từ form danh sách để gửi lên server kèm vói thông tin hiện có của đợt
    this.model.data.danhSach = this.danhSachForm.getMinimizedModel().danhSach;

  }
}
