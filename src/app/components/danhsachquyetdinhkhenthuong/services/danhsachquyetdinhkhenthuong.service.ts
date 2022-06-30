import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GridInfo } from "src/app/shared/models/grid-info";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class DanhSachQuyetDinhKhenThuongService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'DanhSachQuyetDinhKhenThuong');
  }

  thayDoiTrangThai(id: string, trangThai: number) {
    return this.defaultPost(`${this.serviceUri}/ThayDoiTrangThai/${id}/${trangThai}`, {});
  }
  thongKe(idNamHoc: string, gridInfo: GridInfo) {
    return this.defaultPost(`${this.serviceUri}/ThongKe/${idNamHoc}`, gridInfo);
  }
}
