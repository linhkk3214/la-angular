import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class DanhSachSinhVienCapNhatHoSoService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'DanhSachSinhVienCapNhatHoSo');
  }
  thayDoiTrangThai(id: string, trangThai: number) {
    return this.defaultPost(`${this.serviceUri}/ThayDoiTrangThai/${id}/${trangThai}`, {});
  }
}
