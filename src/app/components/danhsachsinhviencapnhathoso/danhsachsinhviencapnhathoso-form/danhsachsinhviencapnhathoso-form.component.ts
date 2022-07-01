import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../../dm-khoavien/services/dm-khoavien.service';
import { DM_NganhService } from '../../dm-nganh/services/dm-nganh.service';
import { DM_TrinhDoDaoTaoService } from '../../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
import { DotCapNhatHoSoNguoiHocService } from '../../dotcapnhathosonguoihoc/services/dotcapnhathosonguoihoc.service';
import { HoSoNguoiHocService } from '../../hosonguoihoc/services/hosonguoihoc.service';
import { DanhSachSinhVienCapNhatHoSoService } from '../services/danhsachsinhviencapnhathoso.service';

@Component({
  selector: 'danhsachsinhviencapnhathoso-form',
  templateUrl: './danhsachsinhviencapnhathoso-form.component.html',
  styleUrls: ['./danhsachsinhviencapnhathoso-form.component.scss']
})
export class DanhSachSinhVienCapNhatHoSoFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachSinhVienCapNhatHoSoService: DanhSachSinhVienCapNhatHoSoService,
    private _dotCapNhatHoSoNguoiHocService: DotCapNhatHoSoNguoiHocService,
    private _hoSoNguoiHocService: HoSoNguoiHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._DanhSachSinhVienCapNhatHoSoService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idDot',
        label: 'Đợt cập nhật',
        required: true,
        service: this._dotCapNhatHoSoNguoiHocService
      }),
      new DropdownControlSchema({
        field: 'idNguoiHoc',
        label: 'Sinh viên',
        required: true,
        service: this._hoSoNguoiHocService
      }),
    ];
  }
}
