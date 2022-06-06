import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class DanTocService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'DanToc');
  }

  sync() {
    return this.defaultPost(`${this.serviceUri}/Sync`, {});
  }
}
