import { TemplateRef } from "@angular/core";
import { MenuItem } from "primeng/api";
import { IValidator } from "../base-class/validators";
import { CrudFormComponent } from "../crud-form/crud-form.component";
import { BaseService } from "../services/base.service";
import { isArray, isLiteralObject } from "../utils/common";
import { ControlType, DataType, FormState, HeightType, Operator, TextAlign } from "./enums";
import { Filter, FilterWithBinding, Sort } from "./grid-info";

export class FormSchema {
  nameType?: string;
  field?: string;
  label?: string;
  fullLabel?: string;
  showLabel?: boolean = true;
  centerLabel?: boolean = false;
  width?: number | string = 6;
  rowSpan?: number = 1;
  widthInList?: string;
  disabled?: boolean = false;
  required?: boolean = false;
  uniqueField?: string;
  hidden?: boolean = false;
  hiddenCheck?: (rootModel: any, currentNode: ControlTreeNode) => boolean;
  class?: string = '';
  textAlign?: TextAlign = TextAlign.Left; // Phục vụ align trong table schema
  visibleInList?= true;  // Phục vụ trong table schema
  constructor(init?: FormSchema) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class LabelSchema extends FormSchema {
  for?= '';
  isHtml?= false;
  override width?= 12;
  indexLabel?: number;
  text?= '';

  constructor(init?: LabelSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class TitleSchema extends LabelSchema {
  override class?= 'title-group text-bold';
  override width?= 12;

  constructor(init?: TitleSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class ControlSchema extends FormSchema {
  defaultValue?: any;
  _component?: any;
  validators?: IValidator[] = [];
  onChanged?: Function;
  triggerLoadChild?: Function;
  constructor(init?: ControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class TextControlSchema extends ControlSchema {
  placeholder?: string = '';
  dataFormat?: 'text' | 'password' | 'email' | 'phone' | 'fax' = 'text';
  constructor(init?: TextControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class CheckBoxControlSchema extends ControlSchema {
  hiddenLabel?= false;
  override defaultValue?= false;
  constructor(init?: CheckBoxControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class MaskControlSchema extends TextControlSchema {
  maskType?: 'decimal' | 'int' = 'int';
  autoFormat?= true; // Nếu tắt autoformat thì sẽ dùng control input number mặc định của trình duyệt
  min?= 0;
  max?= 9999999999;
  prefix?= '';
  suffix?= '';
  decimalPlaces?= 2;

  constructor(init?: MaskControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class TextAreaControlSchema extends ControlSchema {
  placeholder?: string = '';
  height?: string = '100px';
  constructor(init?: TextAreaControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class DataSourceSchema extends ControlSchema {
  multiple?: boolean = false;
  dataSource?: any[];
  service?: BaseService;
  initDataByService?: boolean = false;
  valueField?: string = '_id';
  displayField?: string = 'ten';
  funcGetLabel?: (item: any) => string; // Hàm cho phép thay đổi label của các item trong dropdown
  funcCompare?: (item: any, value) => boolean = (item, value) => item[this.valueField] == value;

  constructor(init?: DataSourceSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class DropdownControlSchema extends DataSourceSchema {
  placeholder?: string = '';
  loadOnInit?= false;
  isServerLoad?= false;
  searchField?: string[] = []; // Danh sách các trường sẽ tìm kiếm khi dùng isServerLoad
  disableDisplayFieldServerSearch?: boolean = false; // Option không tìm kiếm đối với trường displayField
  allowLoadDataWhenParentNull?= false;
  sorts?: Sort[] = [];
  sortField?= '';
  sortDir?: 1 | -1 = 1;
  fieldPlus?= ''; // Danh sách những trường bổ sung cần lấy thêm ngoài id, ten; Ví dụ ,ma
  defaultFilters?: Filter[] | Promise<Filter[]>; // Filter mặc định của dropdown
  filterWhileProcess?: Filter[] | Promise<Filter[]>;
  bindingFilters?: FilterWithBinding[];
  modifyFilter?: Function;
  autoDisplayFirst?: boolean = false;
  callbackDataFinish?: (evt: EventData) => void;
  constructor(init?: DropdownControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class DateTimeControlSchema extends ControlSchema {
  appendTo?: string = 'body';
  panelClass?: string = '';
  showTime?: boolean = false;
  constructor(init?: DateTimeControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class DateTimeRangeControlSchema extends DateTimeControlSchema {
  showIcon?= false;

  constructor(init?: DateTimeRangeControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}


export class FileControlSchema extends ControlSchema {
  multiple?= true;
  isAvatar?= false;
  constructor(init?: FileControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class TableControlSchema extends ControlSchema {
  rowTemplate: ControlSchema[];
  rowButtons?: (rowData) => MenuItem[];
  footerButtons?: {
    icon?: string;
    label?: string;
    class?: string;
    message: string;
  }[];
  showNumber?= true;
  showFunction?= true;
  showFooter?= true;
  showSave?= false;
  showEdit?= false;
  showDelete?= true;
  showAdd?= true;
  showDialog?= true;
  onReordered?: Function;
  enableAddMulti?= false;
  pickerControlField?: string;
  isUnique?= true;
  enablePaging?= false;
  limit?= 50;
  initRowCount?= 1;
  mdWidth?= 12;
  widthFunctionColumn?: string = '100px';
  rowButtonTemplate?: TemplateRef<any> = null;
  summaryTemplate?: TemplateRef<any> = null;
  headerTemplate?: TemplateRef<any> = null;

  onAdding?: Function;
  onAdded?: Function;
  onSave?: Function;
  onMessage?: Function;
  onDeleted?: Function;

  constructor(init?: TableControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class ColumnSchema extends DataSourceSchema {
  customData?: any = {};
  override width?: string;
  templateFilter?: TemplateRef<any>;
  fieldFilter?: string;
  operatorFilter?: Operator;
  visible?: boolean = true;
  title?: string;
  allowFilter?: boolean = true;
  fullTextSearch?: boolean = false;
  sort?: boolean = true;
  rawColumn?: ColumnSchema;
  dataType?: DataType | string;
  dataTypeRefField?: DataType | string;
  disableCheckBox?= true;
  controlType?: ControlType = ControlType.textbox;
  fieldPlus?= ''; // Danh sách những trường bổ sung cần lấy thêm ngoài id, ten; Ví dụ ,ma
  displayFieldInGrid?: string;
  separator?= ', ';
  override textAlign?: TextAlign = TextAlign.Left;
  funcGetRefDataRow?: (refItems) => {}; // Dùng để modify chuỗi kết quả reference text của cột có service và là multiple
  funcSetValueRow?: (rowItem, data) => void; // Dùng để gán thêm các thuộc tính cho dòng của table, dựa vào thông tin datasource của bản ghi reference tương ứng
  // Thứ tự ưu tiên get ref data của crud-list
  // Nếu có value nghĩa là những cột này cần phải lấy dữ liệu xong rồi mới đến cột khác
  order?: number;
  constructor(init?: ColumnSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class ListSetting {
  service?: BaseService;
  cols?: ColumnSchema[] = [];
  fieldSearchText?: string[] = [];
  tooltipSearchText?: string = '';
  heightType?: HeightType = HeightType.default;
  hiddenAdd?: boolean = false;
  hiddenDelete?: boolean = false;
  hiddenDeleteMultiple?: boolean = false;
  hiddenEdit?: boolean = false;
  hiddenOrderColumn?: boolean = false;
  hiddenFunctionColumn?: boolean = false;
  widthOrderColumn?: string = '40px';
  widthFunctionColumn: string = '5.2rem';
  showScrollBar?: boolean = true;
  pageSetting?: PageSetting = new PageSetting();
  advanceData?: any = {};
  objectName?: string;
  title?: string;
  hiddenHeader?: boolean = false;
  hiddenPageTitle?: boolean = false;
  hiddenPageSetting?: boolean = false;
  hiddenTextPage?: boolean = false;
  hiddenToolbar?: boolean = false;
  hiddenButtons?: boolean = false;
  hiddenAdvanceSearch?: boolean = false;
  hiddenFilterRow?: boolean = false;

  popupHeader?: string;
  popupSize?: PopupSize = new PopupSize();

  constructor(init?: ListSetting) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class PageSetting {
  page = 1;
  pageSize = 15;

  constructor(init?: PageSetting) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}


export class ListData {
  loading?: boolean = false;
  ready?: boolean = true;
  dataSource?: any[] = [];
  selectedItems?: any[] = [];
  selectedItem?: any;
  selectedItemLast?: any;
  selectedId?: number;
  total: number = 0;
  constructor(init?: ListData) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class CrudFormSetting {
  disableCaching = false;
  hiddenTrinhKy = true;
  schema?: FormSchema[] = [];
  service?: BaseService;
  uniqueField?: string[] | string[][] = [];
  fieldDropdown?: { [key: string]: DropdownControlSchema; } = {};
  fieldNeedGetRef?: { [key: string]: TextControlSchema; } = {};
  displayField?: string | ((item) => string);
  firstFocusControl?: string;
  getCustomDataTrinhKy: (rowData) => any = (rowData) => ({});

  constructor(init?: CrudFormSetting) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class CrudFormData {
  data?: any = {};
  submitting?= false;
  /**
   * Trạng thái của form đang được mở: Là form thêm mới, hay form sửa, hay form xóa
   */
  formState?: FormState = FormState.ADD;

  constructor(init?: CrudFormData) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class PopupSize {
  width?: number;
  height?: number;
  maximize?= false;

  constructor(init?: PopupSize) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class DialogModel {
  showEditForm?: boolean = false;
  header?: string = '';
  popupSize?: PopupSize = new PopupSize({ maximize: true });
  data?: any = {};

  constructor(init?: DialogModel) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class TabViewData {
  code?: string;
  hidden?: boolean = false;
  alwayRender?: boolean = false; // Option xác định luôn luôn render component gắn với tab
  icon?: string;
  label?: string;
  headerStyleClass?: string;
  active?: boolean;
  useScrollbar?= true; // Config để xác định có sử dụng custom-scrollbar không, nếu không thì dùng scrollbar mặc định của trình duyệt

  constructor(init?: TabViewData) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class EventData {
  currentNode: ControlTreeNode;
  sourceNode?: ControlTreeNode;
  sourceEvent?: any;
  eventType?: any;
  data?: any;
  private _crudForm: CrudFormComponent;

  constructor(
    init?: {
      currentNode: ControlTreeNode,
      sourceNode?: ControlTreeNode,
      sourceEvent?: any,
      eventType?: any,
      data?: any,
      crudForm?: CrudFormComponent;
    }
  ) {
    for (const key in init) {
      this[key] = init[key];
    }
  }

  get value(): any {
    return this.currentNode.model;
  }

  get model(): any {
    return this.currentNode.model;
  }

  get parentModel(): any {
    return this.currentNode.parentModel;
  }

  get parentPath(): any {
    return this.currentNode.parentModelPath;

  }

  get rootModel(): any {
    return this.currentNode.rootNode.model;
  }

  get control(): FormSchema {
    return this.currentNode.control;
  }

  get parentControl(): FormSchema {
    return this.currentNode.parentControl;
  }

  get formControls() {
    return this.currentNode.crudForm.formControls;
  }
}


export class ControlTreeNode {
  modelPath: string;
  schemaPath: string;
  field: string;
  parentNode: ControlTreeNode;
  rootNode: ControlTreeNode;
  childNodes: ControlTreeNode[] = [];
  control: ControlSchema;
  _component: any;
  keysPlus: string[];
  private _crudForm: CrudFormComponent;
  private childNodeDic = {};
  private data: any;
  private hasSchema = true;

  constructor(model: any, crudForm: CrudFormComponent, field?: string | number, parentNode?: ControlTreeNode) {
    this.data = model;
    this._crudForm = crudForm;
    if (parentNode) {
      if (parentNode.modelPath != null) {
        if (typeof field === 'string') {
          this.modelPath = `${parentNode.modelPath}.${field}`;
          this.schemaPath = `${parentNode.schemaPath}.${field}`;
        }
        else if (typeof field === 'number') {
          this.modelPath = `${parentNode.modelPath}[${field}]`;
          this.schemaPath = parentNode.schemaPath;
          this.hasSchema = false;
        }
      }
      else {
        const strField = field.toString();
        this.modelPath = strField;
        this.schemaPath = strField;
      }

      this.rootNode = parentNode.rootNode;
    }
    else {
      this.rootNode = this;
    }

    this.field = field?.toString();
    this.parentNode = parentNode;
    if (this.hasSchema) {
      this.control = this._crudForm.formControls[this.schemaPath];
      if (this.control) {
        if (!this.control['nodes']) {
          this.control['nodes'] = {};
        }
        this.control['nodes'][this.modelPath] = this;
      }
    }
    const schema = this._crudForm.formControls[this.schemaPath];
    this.keysPlus = [];
    if (!schema) {
      // Là root node
      if (!this.schemaPath) {
        Object.keys(this._crudForm.formControls).forEach(key => {
          const _control = this._crudForm.formControls[key];
          if (_control.uniqueField == _control.field) {
            this.keysPlus.push(key);
          }
        });
      }
    }
    this.initChildNodes(model, this.keysPlus);
  }

  public reinitChildNodes() {
    this.childNodes.length = 0;
    this.childNodeDic = {};
    this.initChildNodes(this.data, this.keysPlus);
  }

  private initChildNodes(model: any, keysPlus: string[]) {
    if (isLiteralObject(model)) {
      const allKey = new Set([...keysPlus, ...Object.keys(model)]);
      for (const key of allKey) {
        if (key != '_status' && key != '_errors' && key != '_source') {
          const childNode = new ControlTreeNode(model[key], this._crudForm, key, this);
          this.childNodes.push(childNode);
          this.childNodeDic[childNode.field] = childNode;
        }
      }
    }
    else if (isArray(model)) {
      let i = 0;
      if (model.length > 0) {
        for (const item of model) {
          const childNode = new ControlTreeNode(item, this._crudForm, i, this);
          childNode.parentNode = this;
          this.childNodes.push(childNode);
          this.childNodeDic[childNode.field] = childNode;
          i++;
        }
      }
    }
  }

  public getChildNode(field): ControlTreeNode {
    return this.childNodeDic[field];
  }

  setCrudForm(crudForm: CrudFormComponent) {
    this._crudForm = crudForm;
  }

  get crudForm() {
    return this._crudForm;
  }

  get parentModel() {
    if (this.parentNode) return this.parentNode.model;
    return null;
  }

  get parentModelPath() {
    if (this.parentNode) return this.parentNode.modelPath;
    return null;
  }

  get parentControl() {
    if (this.parentNode) return this.parentNode.control;
    return null;
  }

  get model() {
    if (this.parentNode) return this.parentNode.data[this.field];
    else return this.data;
  }

  set model(val) {
    if (this.parentNode) this.parentNode.data[this.field] = val;
    else this.data = val;
  }

  get value() {
    if (this.parentNode) return this.parentNode.data[this.field];
    else return this.data;
  }

  set value(val) {
    if (this.parentNode) this.parentNode.data[this.field] = val;
    else this.data = val;
  }

  public setHidden(field: string | string[], hidden: boolean = true) {
    if (Array.isArray(field)) {
      field.forEach(f => {
        this.setHiddenField(f, hidden);
      });
    }
    else {
      this.setHiddenField(field, hidden);
    }
  }

  private setHiddenField(field: string, hidden: boolean) {
    if (field.indexOf('.') > -1) {
      const childNode = this.getNodeByPath(`${this.modelPath}.${field}`);
      const lastField = field.split('.').pop();
      childNode.parentNode.data._status[lastField].hidden = hidden;
    }
    else {
      this.data._status[field].hidden = hidden;
    }
  }

  public getNodeByPath(modelPath): ControlTreeNode {
    if (modelPath == null || modelPath === '') return this.rootNode;
    return this.findInTree(this.rootNode, modelPath.toLowerCase());
  }

  public getNodeBySchemaPath(schemaPath): ControlTreeNode {
    if (schemaPath == null || schemaPath === '') return this.rootNode;
    return this.findSchemaInTree(this.rootNode, schemaPath.toLowerCase());
  }

  private findInTree(node: ControlTreeNode, modelPath): ControlTreeNode {
    if (node.modelPath != null && node.modelPath.toLowerCase() == modelPath.toLowerCase()) return node;
    else {
      for (const childNode of node.childNodes) {
        if (childNode.modelPath != null && modelPath.startsWith(childNode.modelPath.toLowerCase())) {
          const re = this.findInTree(childNode, modelPath);
          if (re) return re;
        }
      }
    }
    return null;
  }

  private findSchemaInTree(node: ControlTreeNode, schemaPath): ControlTreeNode {
    if (node.schemaPath != null && node.schemaPath.toLowerCase() == schemaPath.toLowerCase()) return node;
    else {
      for (const childNode of node.childNodes) {
        if (childNode.schemaPath != null && schemaPath.startsWith(childNode.schemaPath.toLowerCase())) {
          const re = this.findSchemaInTree(childNode, schemaPath);
          if (re) return re;
        }
      }
    }
    return null;
  }
}
