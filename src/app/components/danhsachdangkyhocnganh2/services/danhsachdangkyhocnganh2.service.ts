import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";
import { GridInfo } from "src/app/shared/models/grid-info";

@Injectable({
  providedIn: 'root'
})
export class DanhSachDangKyHocNganh2Service extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'DanhSachDangKyHocNganh2');
  }

  thayDoiTrangThai(id: string, trangThai: number) {
    return this.defaultPost(`${this.serviceUri}/ThayDoiTrangThai/${id}/${trangThai}`, {});
  }
  thongKeSinhVienNganh2Dv1(gridInfo: GridInfo) {
    return this.defaultPost(`${this.serviceUri}/thongKeTheoDonVi1`, gridInfo);
  }
  thongKeSinhVienNganh2Dv2(gridInfo: GridInfo) {
    return this.defaultPost(`${this.serviceUri}/thongKeTheoDonVi2`, gridInfo);
  }
}
