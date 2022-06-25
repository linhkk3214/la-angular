import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class DotNhapHoc_TpHoSoService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'DotNhapHoc_TpHoSo');
  }
}
