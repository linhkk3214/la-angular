import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseResult } from "../models/response-result";
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { firstValueFrom } from "rxjs";
import { Filter, GridInfo } from "../models/grid-info";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  REPLAY_COUNT: number = 1;
  RETRY_COUNT: number = 0;
  serviceUri?: string;
  tableName?: string;
  constructor(
    private _http: HttpClient,
    @Inject(String) _tableName: string,
  ) {
    this.tableName = _tableName;
    this.serviceUri = `http://localhost:3000/${this.tableName}`;
  }

  defaultGet(apiUrl: string, options?: HttpOptions): Promise<ResponseResult> {
    return firstValueFrom(
      this._http.get<ResponseResult>(apiUrl, options)
        .pipe(
          shareReplay(this.REPLAY_COUNT),
          retry(this.RETRY_COUNT),
          catchError((err: HttpErrorResponse) => this.handleError(err))
        )
    );

  }

  defaultPost(apiUrl: string, data: any, options?: HttpOptions): Promise<ResponseResult> {
    return firstValueFrom(
      this._http.post<ResponseResult>(apiUrl, data, options)
        .pipe(
          shareReplay(this.REPLAY_COUNT),
          retry(this.RETRY_COUNT),
          catchError((err: HttpErrorResponse) => this.handleError(err))
        ));
  }

  defaultPut(apiUrl: string, data: any): Promise<ResponseResult> {
    return firstValueFrom(
      this._http.put<ResponseResult>(apiUrl, data)
        .pipe(
          shareReplay(this.REPLAY_COUNT),
          retry(this.RETRY_COUNT),
          catchError((err: HttpErrorResponse) => this.handleError(err))
        ));
  }

  defaultDelete(apiUrl: string): Promise<ResponseResult> {
    return firstValueFrom(
      this._http.delete<ResponseResult>(apiUrl)
        .pipe(
          shareReplay(this.REPLAY_COUNT),
          retry(this.RETRY_COUNT),
          catchError((err: HttpErrorResponse) => this.handleError(err))
        ));
  }

  handleError(error: any) {
    return Promise.resolve(<ResponseResult>{
      message: 'Có lỗi xảy ra. Hãy liên hệ quản trị viên để biết thêm chi tiết!!!',
      error,
      data: null,
      totalRecord: 0,
      success: false,
    });
  }

  getAll() {
    return this.defaultGet(`${this.serviceUri}`);
  }

  getDetail(id: string) {
    return this.defaultGet(`${this.serviceUri}/${id}`);
  }

  insert(data: any) {
    return this.defaultPost(`${this.serviceUri}`, data);
  }

  update(id: string, data: any) {
    return this.defaultPut(`${this.serviceUri}/${id}`, data);
  }

  delete(id: string) {
    return this.defaultDelete(`${this.serviceUri}/${id}`);
  }

  getData(gridInfo: GridInfo) {
    return this.defaultPost(`${this.serviceUri}/getData`, gridInfo);
  }

  getAllByFilter(filters: Filter[]) {
    return this.defaultPost(`${this.serviceUri}/getAllByFilter`, filters);
  }

  getDetailByFilter(filters: Filter[]) {
    return this.defaultPost(`${this.serviceUri}/getDetailByFilter`, {
      filters
    });
  }
}

export class HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
