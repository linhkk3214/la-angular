import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class ThongBaoService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'ThongBao');
  }
}
