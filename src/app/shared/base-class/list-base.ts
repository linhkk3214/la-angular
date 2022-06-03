import { AfterViewInit, Directive, Injector, OnInit, ViewChild } from "@angular/core";
import { CrudListComponent } from "../crud-list/crud-list.component";
import { FieldOrderCrudList, KeyFieldGetRefType } from "../models/const";
import { EnumGetRefType, FormState, Operator } from "../models/enums";
import { GridInfo } from "../models/grid-info";
import { ResponseResult } from "../models/response-result";
import { ColumnSchema, CrudFormData, ListData, ListSetting } from "../models/schema";
import { ComponentBase } from "./component-base";

@Directive()
export abstract class ListBase extends ComponentBase implements OnInit, AfterViewInit {
  public crudList: CrudListComponent;
  @ViewChild(CrudListComponent) set contentCrudList(content: CrudListComponent) {
    const beforeValue = this.crudList;
    if (content) {
      this.crudList = content;
      if (!beforeValue) {
        this.countReady++;
        if (this.countReady < 2) {
          return;
        }
        this.processData();
      }
    }

  }

  setting: ListSetting = new ListSetting();
  model: ListData = new ListData();
  countReady: number = 0;

  formModel: CrudFormData = new CrudFormData();
  showDetailForm: boolean = false;
  scopeDataEdit: any = {};

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    if (this.setting.service == null) {
      this.toastWarning('Bạn chưa cấu hình base service cho danh sách');
      return;
    }

  }

  ngAfterViewInit(): void {
    this.countReady++;
    if (this.countReady > 1) {
      this._triggerProcessData();
    }

  }

  async _triggerProcessData(gridInfo?: GridInfo) {
    await this.processData(gridInfo);
  }

  processData(gridInfo?: GridInfo) {
    if (!this.crudList) {
      return;
    }
    if (!gridInfo) {
      gridInfo = this.crudList.getGridInfo();
    }
    this.getData(gridInfo);
  }

  async modifyGridInfo(gridInfo: GridInfo): Promise<boolean | void> {
    return true;
  }

  private async getData(gridInfo: GridInfo) {
    if (this.setting.service && this.model.ready && !this.model.loading) {
      this._markLoading();
      const resultModify = await this.modifyGridInfo(gridInfo);
      if (resultModify === false) {
        this.model.dataSource = [];
        this.model.total = 0;
        this._unmarkLoading();
        return;
      }
      this.doGetRequest(gridInfo);
    }
  }

  private doGetRequest(gridInfo: GridInfo) {
    if (this.setting.service) {
      this.getPromiseGetData(gridInfo)
        .then(async response => {
          if (response.success) {
            await this.processGetData(response);
            this.fireDataLoaded();
          }
          else {
            this.toastWarning(response.message);
            this.fireDataLoaded(false);
          }
        }, error => {
          this.toastError(error);
          this.fireDataLoaded(false);
        });
    }
  }

  private async processGetData(response: ResponseResult) {
    this.model.total = response.totalRecord;
    if (response.data && response.data.length > 0) {
      await this.beforeRenderDataSource(response.data);
    }
    const dataSource = response.data;
    dataSource.forEach((item, index) => {
      item[FieldOrderCrudList] = (this.setting.pageSetting.page - 1) * this.setting.pageSetting.pageSize + 1 + index;
    });
    await this.afterProcessDataInBase(dataSource);
    this.model.dataSource = dataSource;

    const resetSelectedItems = this.model.selectedItems && this.model.selectedItems.length;
    if (resetSelectedItems) {
      this.model.selectedItems.length = 0;
    }

    await this.afterGetData();
    this._getRefDataDropdown(this.model.dataSource);
  }

  beforeRenderDataSource(datasource: any): Promise<any> {
    return datasource;
  }

  async afterProcessDataInBase(dataSource: any[] = []) {

  }

  async afterGetData() {

  }

  public async _getRefDataDropdown(dataSource) {
    if (dataSource && dataSource.length > 0) {
      if (this.setting.advanceData.fieldNeedGetRef) {
        const arrPromiseDontNeedWait = [];
        const arrSchemaDontNeedWait = [];
        for (const schema of this.setting.advanceData.fieldNeedGetRef) {
          const field = schema.field;
          if (schema[KeyFieldGetRefType] == EnumGetRefType.SERVER) {
            if (schema.forceGetData
              || this.setting.cols.some(item => item.field == 'str' + field && item.visible != false)
            ) {
              const arrValue = [];
              dataSource.forEach(itemData => {
                const currentValue = itemData[field];
                if (currentValue != null) {
                  if (schema.multiple) {
                    let ids = currentValue;
                    if (!Array.isArray(ids)) {
                      ids = ids.split(',');
                    }
                    ids.forEach(id => {
                      if (!id) return;
                      if (!arrValue.some(p => p == id)) {
                        arrValue.push(id);
                      }
                    });
                  }
                  else if (!arrValue.some(p => p == currentValue)) {
                    arrValue.push(currentValue);
                  }
                }
              });
              if (arrValue.length > 0) {
                let promise = schema.service.getAllByFilter(
                  [this.newFilter(schema.valueField, Operator.in, arrValue)]
                );
                if (schema.order != null) {
                  const result = (await promise).data;
                  if (schema.callbackDataFinish) {
                    schema.callbackDataFinish({
                      data: result
                    });
                  }
                  this.mergeRefDataToDatasource(dataSource, schema, result);
                }
                else {
                  arrPromiseDontNeedWait.push(promise);
                  arrSchemaDontNeedWait.push(schema);
                }
              }
            }
          }
          else {
            const funcGetLabel = this.getFuntionGetLabel(schema);
            dataSource.forEach(itemData => {
              const refItem = schema.dataSource.find(i => schema.funcCompare(i, itemData[field]));
              if (refItem != null) {
                itemData['str' + field] = funcGetLabel(refItem);
              }
            });
          }
        }
        if (arrPromiseDontNeedWait.length > 0) {
          const arrRes = await Promise.all(arrPromiseDontNeedWait);
          arrSchemaDontNeedWait.forEach((schema, index) => {
            if (schema.callbackDataFinish) {
              schema.callbackDataFinish({
                data: arrRes[index].data
              });
            }
            this.mergeRefDataToDatasource(dataSource, schema, arrRes[index].data);
          });
        }
        this.afterGetRefDataDropdown(null);
      }
    }
  }

  private getFuntionGetLabel(schema: ColumnSchema) {
    let funcGetLabel = item => item[schema.displayFieldInGrid] || item[schema.displayField] || item['ten'];
    if (schema.funcGetLabel) {
      funcGetLabel = schema.funcGetLabel;
    }
    return funcGetLabel;
  }

  private mergeRefDataToDatasource(dataSource: any[], schema: ColumnSchema, data: any[]) {
    if (data == null) return;
    const field = schema.field;
    const funcGetLabel = this.getFuntionGetLabel(schema);
    let funcSetValueRow = (rowItem, data) => {
    };
    let funcGetRefDataRow = (refItems) => {
      return refItems.map(item => funcGetLabel(item)).join(`${schema.separator} `);
    };
    if (schema.funcSetValueRow) {
      funcSetValueRow = schema.funcSetValueRow;
    }
    if (schema.funcGetRefDataRow) {
      funcGetRefDataRow = schema.funcGetRefDataRow;
    }
    if (schema.multiple) {
      dataSource.forEach(itemData => {
        if (itemData[field] != null) {
          let ids = itemData[field];
          if (!Array.isArray(ids)) {
            ids = ids.split(',');
          }
          const refItems = data.filter(i => ids.some(q => schema.funcCompare(i, q)));
          if (refItems.length > 0) {
            itemData['str' + field] = funcGetRefDataRow(refItems);
            funcSetValueRow(itemData, refItems);
          }
        }
      });
    }
    else {
      dataSource.forEach(itemData => {
        if (itemData[field] != null) {
          const refItem = data.find(i => schema.funcCompare(i, itemData[field]));
          if (refItem != null) {
            itemData['str' + field] = funcGetLabel(refItem);
            funcSetValueRow(itemData, refItem);
          }
        }

      });
    }
    this.afterGetRefDataDropdown(field);
  }

  afterGetRefDataDropdown(field: string) {

  }

  _markLoading() {
    this.model.loading = true;
  }

  _handleReloaded(evt = null) {
    this._unmarkLoading();
    this.afterReloaded();
  }

  async afterReloaded() { }

  _unmarkLoading() {
    this.model.loading = false;
  }

  private fireDataLoaded(success: boolean = true) {
    this._unmarkLoading();
  }

  getPromiseGetData(gridInfo: GridInfo) {
    return this.setting.service.getData(gridInfo);
  }

  async beforeAdd() {

  }

  async _add(evt) {
    const resultValidate = await this.validateAdd();
    if (!resultValidate) {
      return;
    }
    this.formModel.data = {};
    this.formModel.formState = FormState.ADD;
    await this.beforeAdd();
    this.setting.popupHeader = `Thêm mới ${this.setting.objectName} `;
    this.showDetailForm = true;
  }

  async validateAdd() {
    return true;
  }

  async _edit(rowData, scopeDataEdit: any = {}) {
    await this.beforeEdit();
    this.formModel.formState = FormState.EDIT;
    this.setting.popupHeader = `Chi tiết ${this.setting.objectName} `;
    this.scopeDataEdit = scopeDataEdit;
    this.formModel.data = this.cloneData(rowData);
    await this.modifyEditModel(rowData);
    this.showDetailForm = true;
  }

  async beforeEdit() {
  }

  async modifyEditModel(rowData: any) {
  }

  private cloneData(rowData) {
    return {
      _id: rowData._id,
    };
  }

  _delete(rowData) {
    if (rowData.__disableDelete) {
      return;
    }
    this.confirm('Bạn có chắc chắn muốn xóa bản ghi đã chọn').then(rs => {
      if (!rs) {
        return;
      }
      if (this.setting.service) {
        this.getPromiseDeleteItem(rowData)
          .then(response => {
            if (response.success) {
              this._triggerProcessData();
              this.toastSuccess('Xóa bản ghi thành công');
            }
            else {
              this.toastWarning(response.message);
            }
          }, error => {
            console.error(error);
            this.toastWarning('Có lỗi xảy ra');
          });
      }
    });
  }

  getPromiseDeleteItem(rowData) {
    return this.setting.service.delete(rowData._id);
  }

  _handleSaved() {
    this.showDetailForm = false;
    this._triggerProcessData();
  }

  _handleCancel($event) {
    this.showDetailForm = false;
  }
}
