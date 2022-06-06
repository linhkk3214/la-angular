import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class QuocTichService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'QuocTich');
  }

  sync() {
    return this.defaultPost(`${this.serviceUri}/Sync`, {});
  }
}
