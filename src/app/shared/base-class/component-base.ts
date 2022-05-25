import { Directive, Injector, QueryList, TemplateRef } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Filter } from "../models/grid-info";
import { v4 as uuidv4 } from 'uuid';
import { Operator } from "../models/enums";

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
    return new Filter({
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
}
