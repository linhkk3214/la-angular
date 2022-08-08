import { Component, Injector, OnInit } from '@angular/core';
import { KeyStorageDefaultSetting } from 'src/app/models/const';
import { Operator } from 'src/app/shared/models/enums';
import { DropdownControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_HocKyService } from '../dm-hocky/services/dm-hocky.service';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';

@Component({
  selector: 'default-setting',
  templateUrl: './default-setting.component.html',
  styleUrls: ['./default-setting.component.scss']
})
export class DefaultSettingComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
  ) {
    super(injector);
    this.autoSave = false;
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_HocKyService;
    const defaultSetting = this.getDefaultSetting();
    if (defaultSetting) {
      this.model.data.idHeDaoTao = defaultSetting.idHeDaoTao;
      this.model.data.namHoc = defaultSetting.namHoc;
      this.model.data.idHocKy = defaultSetting.idHocKy;
    }
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        required: true,
        width: 12,
        service: this._dm_HeDaoTaoService,
        fieldPlus: 'ma'
      }),
      new DropdownControlSchema({
        field: 'namHoc',
        label: 'Năm học',
        required: true,
        width: 12,
        service: this._dm_NamHocService,
        valueField: 'nam',
        fieldPlus: '_id'
      }),
      new DropdownControlSchema({
        field: 'idHocKy',
        label: 'Học kỳ',
        required: true,
        width: 12,
        service: this._dm_HocKyService,
        bindingFilters: [
          this.newBindingFilter('idNamHoc', Operator.equal, 'namHoc', '_id'),
          this.newBindingFilter('idHeDaoTao', Operator.equal, 'idHeDaoTao')
        ]
      })
    ];
  }

  override handleManualSave() {
    localStorage.setItem(KeyStorageDefaultSetting, JSON.stringify(this.model.data));
    window.location.reload();
  }

  removeSetting(evt) {
    localStorage.removeItem(KeyStorageDefaultSetting);
    window.location.reload();
  }
}
