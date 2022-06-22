import { Directive, Injector, QueryList, TemplateRef } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { KeyStorageDefaultSetting, PrefixFieldObjectDropdown } from "src/app/models/const";
import { v4 as uuidv4 } from 'uuid';
import { Operator } from "../models/enums";
import { Filter, FilterWithBinding } from "../models/grid-info";
import { ResponseResult } from "../models/response-result";

@Directive({
  providers: [MessageService, ConfirmationService]
})
export abstract class ComponentBase {
  private readonly messageService: MessageService;
  private readonly confirmationService: ConfirmationService;
  constructor(injector: Injector) {
    this.messageService = injector.get(MessageService);
    this.confirmationService = injector.get(ConfirmationService);
  }

  toastSuccess(message: string, title: string = 'Thông báo') {
    this.messageService.add({ severity: 'success', summary: title, detail: message });
  }

  toastInfo(message: string, title: string = 'Thông báo') {
    this.messageService.add({ severity: 'info', summary: title, detail: message });
  }

  toastWarning(message: string, title: string = 'Thông báo') {
    this.messageService.add({ severity: 'warn', summary: title, detail: message });
  }

  toastError(message: string, title: string = 'Thông báo') {
    this.messageService.add({ severity: 'error', summary: title, detail: message });
  }

  confirm(message: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.confirmationService.confirm({
        header: 'Thông báo',
        message: message,
        acceptLabel: 'Tiếp tục',
        acceptButtonStyleClass: 'p-button-text',
        rejectLabel: 'Hủy bỏ',
        rejectButtonStyleClass: 'p-button-text p-button-secondary',
        accept: () => {
          res(true);
        },
        reject: () => {
          res(false);
        }
      });
    })
  }

  newFilter(field: string, operator: Operator, value: any) {
    return new Filter({
      field, operator,
      value: JSON.stringify(value)
    });
  }

  newBindingFilter(column: string, operator: Operator, sourceField: string, subField?: string) {
    return new FilterWithBinding({
      field: column,
      operator,
      sourceField,
      subField
    });
  }

  findTemplateFromList($list: QueryList<TemplateRef<any>>, templateName: string) {
    return $list
      ? $list.find((template: any) => {
        if (template._def && template._def.references) {
          // old version, not ivy
          return template._def.references[templateName];
        }
        else if (template._declarationTContainer && template._declarationTContainer.localNames) {
          // is ivy template
          return template._declarationTContainer.localNames[0] == templateName;
        }
        return null;
      })
      : null;
  }

  guid() {
    return uuidv4();
  }

  // Lấy cấu hình mặc định của hệ thống
  getDefaultSetting() {
    const jsonDefaultSetting = localStorage.getItem(KeyStorageDefaultSetting);
    if (!jsonDefaultSetting) return {};
    const defaultSetting = JSON.parse(jsonDefaultSetting);
    return {
      idHeDaoTao: defaultSetting.idHeDaoTao,
      namHoc: defaultSetting.namHoc,
      idNamHoc: defaultSetting[`${PrefixFieldObjectDropdown}namHoc`]._id,
      idHocKy: defaultSetting.idHocKy
    }
  }

  trackByFuncDefault(index, item) {
    return index;
  }

  trackByFuncId(index, item) {
    return item._id;
  }

  handleResponse(res: ResponseResult, message?: string, callBack?: Function, callBackError?: Function) {
    if (!res.success) { // Nếu k thành công thì kiểm tra response có message trả về thì hiển thị message
      if (res.message != null && res.message != '') {
        this.toastWarning(res.message);
      }
      else {
        this.toastWarning(res.error);
      }
      return;
    }

    // Nếu đã chạy đến đây thì nghĩa là response trả về báo thành công
    if (callBackError) {
      callBackError(res);
    }
    // nếu có message khai báo thì hiển thị message
    if (message) {
      this.toastSuccess(message);
    }

    // Callback nếu thực hiện thành công
    if (callBack) {
      callBack(res);
    }
  }
}
