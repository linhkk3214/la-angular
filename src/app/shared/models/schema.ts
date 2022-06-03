import { IValidator } from "../base-class/validators";
import { CrudFormComponent } from "../crud-form/crud-form.component";
import { BaseService } from "../services/base.service";
import { isArray, isLiteralObject } from "../utils/common";
import { ControlType, DataType, FormState, HeightType } from "./enums";
import { Filter, Sort } from "./grid-info";

export class FormSchema {
  nameType?: string;
  field?: string;
  label?: string;
  fullLabel?: string;
  showLabel?: boolean = true;
  width?: number | string = 6;
  disabled?: boolean = false;
  required?: boolean = false;
  uniqueField?: string;
  hidden?: boolean = false;
  hiddenCheck?: (rootModel: any, currentNode: ControlTreeNode) => boolean;
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
  class?= 'title-group text-bold';
  override width?= 12;

  constructor(init?: TitleSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class ControlSchema extends FormSchema {
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

export class MaskControlSchema extends TextControlSchema {
  maskType?: 'decimal' | 'int' = 'int';
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
  funcGetLabel?: (item: any) => string;
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
  defaultFilters?: Filter[] | Promise<Filter[]>; // tungts thêm kiểu dữ liệu defaultFilters là promise
  filterWhileProcess?: Filter[] | Promise<Filter[]>; // tungts thêm kiểu dữ liệu defaultFilters là promise
  bindingFilters?: Filter[] | Promise<Filter[]>; // tungts thêm kiểu dữ liệu defaultFilters là promise
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
  constructor(init?: FileControlSchema) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class ColumnSchema extends DataSourceSchema {
  override width?: string;
  visible?: boolean = true;
  title?: string;
  allowFilter?: boolean = true;
  fullTextSearch?: boolean = false;
  sort?: boolean = true;
  rawColumn?: ColumnSchema;
  dataType?: DataType | string;
  dataTypeRefField?: DataType | string;
  controlType?: ControlType = ControlType.textbox;
  displayFieldInGrid?: string;
  separator?= ', ';
  funcGetRefDataRow?: (refItems) => {};
  funcSetValueRow?: (rowItem, data) => void;
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
  popupSize?: PopupSize;

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

  get formControls(): FormSchema[] {
    return this.currentNode.formControls;
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
  formControls;
  keysPlus: string[];
  private _crudForm: CrudFormComponent;
  private childNodeDic = {};
  private data: any;
  private hasSchema = true;

  constructor(model: any, schemas: [], field?, parentNode?: ControlTreeNode) {
    this.data = model;
    this.formControls = schemas;
    if (parentNode) {
      if (parentNode.modelPath != null) {
        if (typeof field === 'string') {
          this.modelPath = parentNode.modelPath + '.' + field;
          this.schemaPath = parentNode.schemaPath + '.' + field;
        }
        else if (typeof field === 'number') {
          this.modelPath = parentNode.modelPath + '[' + field + ']';
          this.schemaPath = parentNode.schemaPath;
          this.hasSchema = false;
        }
      }
      else {
        this.modelPath = field;
        this.schemaPath = field;
      }

      this.rootNode = parentNode.rootNode;
    }
    else {
      this.rootNode = this;
    }

    this.field = field;
    this.parentNode = parentNode;
    if (this.hasSchema) {
      this.control = schemas[this.schemaPath];
      if (this.control) {
        if (!this.control['nodes']) {
          this.control['nodes'] = {};
        }
        this.control['nodes'][this.modelPath] = this;
      }
    }
    const schema = schemas[this.schemaPath];
    let keysPlus = [];
    if (schema) {

    }
    else {
      if (!this.schemaPath) {
        keysPlus = Object.keys(schemas);
      }
    }
    this.keysPlus = keysPlus;
    this.initChildNodes(model, schemas, keysPlus);
  }

  public reinitChildNodes() {
    this.childNodes.length = 0;
    this.childNodeDic = {};
    this.initChildNodes(this.data, this.formControls, this.keysPlus);
  }

  private initChildNodes(model: any, schemas: [], keysPlus: string[]) {
    if (isLiteralObject(model)) {
      const allKey = new Set([...keysPlus, ...Object.keys(model)]);
      for (const key of allKey) {
        if (key != '_status' && key != '_errors' && key != '_source') {
          const childNode = new ControlTreeNode(model[key], schemas, key, this);
          this.childNodes.push(childNode);
          this.childNodeDic[childNode.field] = childNode;
        }
      }
    }
    else if (isArray(model)) {
      let i = 0;
      if (model.length > 0) {
        for (const item of model) {
          const childNode = new ControlTreeNode(item, schemas, i, this);
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
