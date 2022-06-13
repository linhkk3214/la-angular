import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator, TextAlign } from 'src/app/shared/models/enums';
import { CheckBoxControlSchema, DropdownControlSchema, EventData, MaskControlSchema, TableControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TpHoSoService } from '../../dm-tphoso/services/dm-tphoso.service';
import { DotNhapHoc_TpHoSoService } from '../services/dotnhaphoc-tphoso.service';

@Component({
  selector: 'dotnhaphoc-tphoso-danhsach-form',
  templateUrl: './dotnhaphoc-tphoso-danhsach-form.component.html',
  styleUrls: ['./dotnhaphoc-tphoso-danhsach-form.component.scss']
})
export class DotNhapHoc_TpHoSo_DanhSachFormComponent extends FormBase implements OnInit {
  @Input() idDotNhapHoc: string;
  ready = false;
  constructor(
    injector: Injector,
    private _dotNhapHoc_TpHoSoService: DotNhapHoc_TpHoSoService,
    private _dm_TpHoSoService: DM_TpHoSoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dotNhapHoc_TpHoSoService;
    this.setting.schema = [
      new TableControlSchema({
        field: 'danhSach',
        label: 'Danh sách hồ sơ',
        initRowCount: 0,
        showLabel: false,
        width: 12,
        rowTemplate: [
          new DropdownControlSchema({
            field: 'idTpHoSo',
            label: 'Hồ sơ',
            service: this._dm_TpHoSoService,
            fieldPlus: 'ma',
            required: true,
            // Hàm sẽ chạy sau khi dataSource của dropdown được load
            callbackDataFinish: (evt: EventData) => {
              const rowModel = evt.currentNode.parentModel;
              // Tìm bản ghi thành phần hồ sơ được chọn
              const itemSelected = evt.data.find(q => q.value == rowModel.idTpHoSo);
              if (itemSelected) {
                // Set mã hồ sơ theo thông tin lấy được từ bản ghi thành phần hồ sơ được chọn
                rowModel.maHoSo = itemSelected.ma;
              }
            }
          }),
          new TextControlSchema({
            field: 'maHoSo',
            label: 'Mã hồ sơ',
            widthInList: '80px',
            disabled: true
          }),
          new MaskControlSchema({
            field: 'soLuongBanChinh',
            label: 'Bản chính',
            required: true,
            suffix: 'Bản',
            widthInList: '115px',
          }),
          new MaskControlSchema({
            field: 'soLuongBanSao',
            label: 'Bản sao',
            required: true,
            suffix: 'Bản',
            widthInList: '115px',
          }),
          new MaskControlSchema({
            field: 'soLuongBanCC',
            label: 'Bản công chứng',
            required: true,
            suffix: 'Bản',
            widthInList: '125px',
          }),
          new CheckBoxControlSchema({
            field: 'nopOnline',
            label: 'Nộp online',
            hiddenLabel: true,
            textAlign: TextAlign.Center,
            widthInList: '100px',
          }),
          new CheckBoxControlSchema({
            field: 'nopTrucTiep',
            label: 'Nộp trực tiếp',
            hiddenLabel: true,
            textAlign: TextAlign.Center,
            widthInList: '100px',
          })
        ]
      })
    ];
    this.getData();
  }

  async getData() {
    if (!this.idDotNhapHoc) return;
    const lstData = (await this._dotNhapHoc_TpHoSoService.getAllByFilter([
      this.newFilter('idDotNhapHoc', Operator.equal, this.idDotNhapHoc)
    ])).data;
    this.crudForm.setTableNodeDataSource('danhSach', lstData);
  }

}
