import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";
import { GridInfo } from "src/app/shared/models/grid-info";

@Injectable({
  providedIn: 'root'
})
export class DanhSachQuyetDinhHocBongService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'DanhSachQuyetDinhHocBong');
  }

  thongKe(idNamHoc: string, gridInfo: GridInfo) {
    return this.defaultPost(`${this.serviceUri}/ThongKe/${idNamHoc}`, gridInfo);
  }
}
