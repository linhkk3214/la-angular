import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'Address');
  }

  sync() {
    return this.defaultPost(`${this.serviceUri}/Sync`, {});
  }
}
