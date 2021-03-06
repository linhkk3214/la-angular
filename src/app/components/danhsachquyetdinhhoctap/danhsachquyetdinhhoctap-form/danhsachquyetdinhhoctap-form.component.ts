import { Component, Injector, Input, OnInit } from '@angular/core';
import { Operator } from 'src/app/shared/models/enums';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, DateTimeControlSchema, FileControlSchema, TableControlSchema, EventData } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DanhSachLoaiKhenThuongService } from '../../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhSachLoaiQuyetDinhService } from '../../danhsachloaiquyetdinh/services/danhsachloaiquyetdinh.service';
import { DanhSachLopHanhChinhService } from '../../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_ChuongTrinhDaoTaoService } from '../../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_HocKyService } from '../../dm-hocky/services/dm-hocky.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
import { HoSoCanBoService } from '../../user/services/hosocanbo';
import { EnumTrangThaiQuyetDinh } from '../models/enums';
import { DanhSachQuyetDinhHocTapService } from '../services/danhsachquyetdinhhoctap.service';

@Component({
  selector: 'danhsachquyetdinhhoctap-form',
  templateUrl: './danhsachquyetdinhhoctap-form.component.html',
  styleUrls: ['./danhsachquyetdinhhoctap-form.component.scss']
})
export class DanhSachQuyetDinhHocTapFormComponent extends FormBase implements OnInit {
  defaultSetting: any = {};
  isDaDuyet = true;
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocTapService: DanhSachQuyetDinhHocTapService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _hoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CT??TService: DM_ChuongTrinhDaoTaoService,
    private _danhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _danhSachLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._danhSachQuyetDinhHocTapService;
    // L???y setting m???c ?????nh ???????c c???u h??nh
    this.defaultSetting = this.getDefaultSetting();
    this.setting.schema = [
      new TextControlSchema({
        field: 'soQd',
        label: 'S??? quy???t ?????nh',
      }),
      new DateTimeControlSchema({
        field: 'ngayBanHanh',
        label: 'Ng??y ban h??nh'
      }),
      new DropdownControlSchema({
        field: 'idLoaiQuyetDinh',
        label: 'Lo???i quy???t ?????nh',
        required: true,
        service: this._danhSachLoaiQuyetDinhService,
        disabled: true,
      }),
      new DropdownControlSchema({
        field: 'idNamHoc',
        label: 'N??m h???c',
        service: this._dm_NamHocService,
        required: true,
        sortField: 'nam',
        sortDir: -1,
        width: 3,
        disabled: true
      }),
      new DropdownControlSchema({
        field: 'idHocKy',
        label: 'H???c k???',
        required: true,
        service: this._dm_HocKyService,
        defaultFilters: [
          this.newFilter('idHeDaoTao', Operator.equal, this.defaultSetting.idHeDaoTao)
        ],
        bindingFilters: [
          this.newBindingFilter('idNamHoc', Operator.equal, 'idNamHoc')
        ],
        width: 3,
        disabled: true
      }),

      new DropdownControlSchema({
        field: 'idNguoiKy',
        label: 'Ng?????i k??',
        service: this._HoSoCanBoService,
        fieldPlus: 'ma',
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      }),
      new DateTimeControlSchema({
        field: 'ngayHieuLuc',
        label: 'Ng??y hi???u l???c',
      }),
      new TextControlSchema({
        field: 'chucVuNguoiKy',
        label: 'Ch???c v??? ng?????i k??',
      }),
      new FileControlSchema({
        field: 'lstDinhKem',
        label: '????nh k??m'
      }),
      new TextAreaControlSchema({
        field: 'noiDung',
        label: 'N???i dung',
        width: 12
      }),
      new TableControlSchema({
        field: 'danhSachNguoiHoc',
        label: 'Danh s??ch sinh vi??n',
        width: 12,
        disabled: true,
        rowTemplate: [
          new DropdownControlSchema({
            field: 'idNguoiHoc',
            label: 'Ng?????i h???c',
            service: this._hoSoNguoiHocService,
            // displayField: 'hoVaTen',
            funcGetLabel: item => {
              return `${item.hoVaTen} (${item.maSv})`;
            },
            fieldPlus: 'maSv,ngaySinh,idLopHanhChinh, idNganh',
            onChanged: (evt: EventData) => {
              const dropdownControl = <DropdownControlSchema>evt.control;
              const itemNguoiHocSelected = dropdownControl._component.dataSourceInternal.find(q => q.value == evt.parentModel.idNguoiHoc);
              this.setDataNguoiHoc(evt.parentModel, itemNguoiHocSelected);
            }
          }),
          // new TextControlSchema({
          //   field: 'maSv',
          //   label: 'M?? sinh vi??n',
          //   disabled: true
          // }),
          new DateTimeControlSchema({
            field: 'ngaySinh',
            label: 'Ng??y sinh',
            disabled: true
          }),
          new DropdownControlSchema({
            field: 'idLop',
            label: 'L???p h??nh ch??nh',
            service: this._danhSachLopHanhChinhService,
            disabled: true
          }),
          new DropdownControlSchema({
            field: 'idNganh',
            label: 'Ng??nh',
            service: this._dm_CT??TService,
            disabled: true
          })
        ]
      })
    ];
  }

  setDataNguoiHoc(model: any, itemNguoiHoc: any) {
    model.maSv = itemNguoiHoc.maSv;
    model.idNganh = itemNguoiHoc.idNganh;
    model.idLop = itemNguoiHoc.idLopHanhChinh;
    model.ngaySinh = itemNguoiHoc.ngaySinh ? new Date(itemNguoiHoc.ngaySinh) : null;
  }

  override async initDataAdd(evt: EventData): Promise<void> {
    this.isDaDuyet = false;
    this.disabledFormQuyetDinh();
  }

  override async modifyDetailData(data: any): Promise<void> {
    this.isDaDuyet = data.idTrangThai == EnumTrangThaiQuyetDinh.DA_DUYET;
    this.disabledFormQuyetDinh();

    // L???y danh s??ch ng?????i h???c
    if (data.lstIdNguoiHoc) {
      const lstNguoiHoc = (await this._hoSoNguoiHocService.getAllByFilter([
        this.newFilter('_id', Operator.in, data.lstIdNguoiHoc)
      ])).data;
      data.danhSachNguoiHoc = lstNguoiHoc.map(q => {
        const result = {
          idNguoiHoc: q._id
        };
        this.setDataNguoiHoc(result, q);
        return result;
      });
    }
  }

  private disabledFormQuyetDinh() {
    this.formControls.idLoaiQuyetDinh.disabled = this.isDaDuyet;
    this.formControls.idNamHoc.disabled = this.isDaDuyet;
    this.formControls.idHocKy.disabled = this.isDaDuyet;
    this.formControls.danhSachNguoiHoc.disabled = this.isDaDuyet;
  }

  override onBeforeSave(): void | Promise<boolean> {
    this.model.data.lstIdNguoiHoc = [];
    if (this.model.data.danhSachNguoiHoc && this.model.data.danhSachNguoiHoc.length) {
      this.model.data.lstIdNguoiHoc = this.model.data.danhSachNguoiHoc.map(q => q.idNguoiHoc);
    }
  }
}
