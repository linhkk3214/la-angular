import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class HoSoCanBoService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'HoSoCanBo');
  }

  sync() {
    return this.defaultPost(`${this.serviceUri}/Sync`, {});
  }
}
