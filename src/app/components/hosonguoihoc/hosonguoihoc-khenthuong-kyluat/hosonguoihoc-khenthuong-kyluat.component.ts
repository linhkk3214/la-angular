import { Component, Injector, OnInit } from '@angular/core';
import { TabViewData } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';

@Component({
  selector: 'hosonguoihoc-khenthuong-kyluat',
  templateUrl: './hosonguoihoc-khenthuong-kyluat.component.html',
  styleUrls: ['./hosonguoihoc-khenthuong-kyluat.component.scss']
})
export class HoSoNguoiHoc_KhenThuong_KyLuatComponent extends FormBase implements OnInit {
  mainTabData: TabViewData[] = [
    new TabViewData({
      code: 'thongTinChung',
      icon: 'pi pi-info-circle',
      label: 'Thông tin chung'
    }),
    new TabViewData({
      code: 'thongTinTuyenSinh',
      icon: 'pi pi-bookmark',
      label: 'Thông tin Tuyển sinh'
    }),
    new TabViewData({
      code: 'khenThuong',
      icon: 'pi pi-star',
      label: 'Khen thưởng'
    }),
    new TabViewData({
      code: 'quyetDinhHocTap',
      icon: 'pi pi-file',
      label: 'Quyết định học tập'
    }),
    new TabViewData({
      code: 'hocBong',
      icon: 'pi pi-money-bill',
      label: 'Học bổng'
    })
  ];
  activeIndex = 0;
  constructor(
    injector: Injector

  ) {
    super(injector);
    this.autoGetDetail = false;
  }

  override ngOnInit(): void {

  }
}
