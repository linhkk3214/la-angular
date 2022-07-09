import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";
import { GridInfo } from "src/app/shared/models/grid-info";

@Injectable({
  providedIn: 'root'
})
export class HoSoNguoiHocService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'HoSoNguoiHoc');
  }

  thongKeNguoiHocTheoNganh(gridInfo: GridInfo) {
    return this.defaultPost(`${this.serviceUri}/thongKe`, gridInfo);
  }
  thongKeNguoiHocTheoKhoa(gridInfo: GridInfo) {
    return this.defaultPost(`${this.serviceUri}/thongKeTheoKhoa`, gridInfo);
  }
}
