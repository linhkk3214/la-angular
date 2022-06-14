import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Injector, Input, OnInit, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { PrefixFieldObjectDropdown } from 'src/app/models/const';
import { ComponentBase } from '../base-class/component-base';
import { CompareValidator, DateCompareValidator, EmailValidator, NumberCompareValidator, PhoneNumberValidator, RequiredFieldsValidator, RequiredValidator } from '../base-class/validators';
import { KeyFunctionReload, PrefixCustomHeaderTableSchema } from '../models/const';
import { FormState, Operator, TextAlign } from '../models/enums';
import { FilterWithBinding } from '../models/grid-info';
import { ControlSchema, ControlTreeNode, CrudFormSetting, DateTimeControlSchema, DropdownControlSchema, EventData, FileControlSchema, FormSchema, LabelSchema, MaskControlSchema, PopupSize, TableControlSchema, TextControlSchema, TitleSchema } from '../models/schema';
import { isSameArray } from '../utils/common';
import { getFilterFromTemplate } from '../utils/crud';

const operatorContrast = {
  [Operator.greater]: Operator.lower,
  [Operator.greaterThanEqual]: Operator.lowerThanEqual,
  [Operator.lower]: Operator.greater,
  [Operator.lowerThanEqual]: Operator.greaterThanEqual
};

@Component({
  selector: 'crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.scss']
})
export class CrudFormComponent extends ComponentBase implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ContentChildren(TemplateRef) children: QueryList<TemplateRef<any>>;
  @ViewChild('contextMenu', { static: false }) contextMenu: ContextMenu;

  @Input() setting: CrudFormSetting = new CrudFormSetting();
  @Input() data: any;
  @Input() formState: FormState = FormState.EDIT;
  @Input() autoFocus = true;

  @Output() onFormReady = new EventEmitter<any>();
  @Output() onControlReady = new EventEmitter<any>();
  @Output() onAllControlReady = new EventEmitter<any>();
  @Output() onModelChanged = new EventEmitter<any>();
  @Output() onChange: EventEmitter<EventData> = new EventEmitter<EventData>();
  @Output() onAfterTrinhKy = new EventEmitter<any>();

  _rootNode: ControlTreeNode;
  _minimizedData: any;
  _errors: any = {};
  _inValidForm = false;

  formControls: { [key: string]: FormSchema } = {};
  templates: { [key: string]: TemplateRef<any> } = {};
  textAlign = TextAlign;
  focused = false;

  prefixCustomHeader = PrefixCustomHeaderTableSchema;
  buttonContexts: MenuItem[] = [];
  rowDataCurrent: any = {};
  tableFormShow = false;
  tableFormTitle: string;
  tableFormPopupSize = new PopupSize({ width: 1100, height: 650 });
  tableFormData: any = {};
  tableFormCurrentRow: number;
  tableFormSchema: FormSchema[] = [];
  tableFormCurrentInfo: any = {};

  fieldParentField = 'parentField';

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initNameType(this.setting.schema);
    this.initLoad();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.autoFocus && !this.focused) {
        this.focused = true;
        this.focusFirstControl();
      }
    });
  }

  initNameType(schemas: FormSchema[]) {
    schemas.forEach(schema => {
      schema.nameType = schema.constructor.name;
      if (schema instanceof TableControlSchema) {
        this.initNameType(schema.rowTemplate);
      }
    });
  }

  reload() {
    this.initLoad();
  }

  private initLoad() {
    if (!this.setting.schema) return;
    if (this.setting.schema.length == 0) {
      // thực hiện sau cùng khi model đã init xong và các sự kiện add row thực hiện xong
      setTimeout(() => {
        const formEvent = new EventData({
          currentNode: this._rootNode,
          eventType: 'formReady',
          crudForm: this
        });
        this.onFormReady.emit(formEvent);
      });
      return;
    }

    this.initSchema();
    // thực hiện sau cùng khi model đã init xong và các sự kiện add row thực hiện xong
    setTimeout(() => {
      const formEvent = new EventData({
        currentNode: this._rootNode,
        eventType: 'formReady',
        crudForm: this
      });
      this.onFormReady.emit(formEvent);
    });
  }

  private initSchema() {
    for (const control of this.setting.schema) {
      this.initControlSchema(this.data, control);
    }

    for (const control of this.setting.schema) {
      this.initValidatorAndCorrector(control);
      this.initBindingControlSchema(control);
    }

    this.initRootNode();
  }

  initRootNode() {
    this._rootNode = new ControlTreeNode(this.data, this);
    this._rootNode.setCrudForm(this);
  }

  private initControlSchema(data: any, schema: FormSchema, parentId?: string) {
    if (schema.disabled != true) {
      schema.disabled = null;
    }
    if (schema.label && !schema.fullLabel) {
      schema.fullLabel = schema.label;
    }

    this._errors[schema.field] = [];

    if (schema instanceof TitleSchema
      || schema instanceof LabelSchema
    ) {
      schema.showLabel = false;
      if (!schema.field) {
        schema.field = this.guid();
      }
    }

    if (schema.field) {
      let key = schema.field;
      if (parentId != null)
        key = parentId + '.' + key;
      schema.uniqueField = key;
      this.formControls[key] = schema;
    }

    if (schema instanceof DropdownControlSchema) {
      const dropdownControlSchema = <DropdownControlSchema>schema;
      if (!dropdownControlSchema.bindingFilters) {
        dropdownControlSchema.loadOnInit = true;
      }
      if (!dropdownControlSchema.placeholder) {
        dropdownControlSchema.placeholder = `Chọn ${dropdownControlSchema.label}`;
      }
    }
    else if (schema instanceof TableControlSchema) {
      if (!data[schema.field] || !(data[schema.field] instanceof Array)) {
        data[schema.field] = [];
      }
      for (const subControl of schema.rowTemplate) {
        this.initControlSchema(data[schema.field], subControl, schema.field);
      }
    }
  }

  setTableNodeDataSource(path: string, dataSource: any[]) {
    if (!path) return;
    const node = this._rootNode.getNodeByPath(path);
    node.model.splice(0, node.model.length, ...dataSource);
    if (node) node.reinitChildNodes();
  }

  generateModelAdd(schema: TableControlSchema) {
    const result = {
      _id: this.guid()
    };
    schema.rowTemplate.forEach(childSchema => {
      result[childSchema.field] = childSchema.defaultValue;
    });
    return result;
  }

  private initBindingControlSchema(schema: any) {
    if (schema instanceof DropdownControlSchema) {
      const dropdownControlSchema = <DropdownControlSchema>schema;
      if (dropdownControlSchema.bindingFilters) {
        this.bindOnChangeToDropdown(dropdownControlSchema);
      }
    }
  }

  private async bindOnChangeToDropdown(dropdownControlSchema: DropdownControlSchema) {
    let tmpFilters: FilterWithBinding[] = [];
    if (Array.isArray(dropdownControlSchema.bindingFilters)) {
      tmpFilters = dropdownControlSchema.bindingFilters;
    }
    tmpFilters.forEach(filter => {
      const sourceField = filter.sourceField;
      filter.sourceValueField = filter.sourceField;
      const schema = this.setting.schema.find(q => q.field == sourceField);
      if (schema instanceof DropdownControlSchema) {
        filter.sourceValueField = this.getFieldObjectDropdown(schema.field);
        if (!filter.subField) {
          filter.subField = 'value';
        }
      }
    });
    const markedControl = {};
    this.bindOnChangeToDropdownRecursive(dropdownControlSchema, tmpFilters, markedControl);
  }

  getFieldObjectDropdown(field) {
    return `${PrefixFieldObjectDropdown}${field}`;
  }

  private bindOnChangeToDropdownRecursive(childDropdown: DropdownControlSchema, tmpFilters: FilterWithBinding[], markedControl) {
    if (tmpFilters instanceof Array) {
      for (const filter of tmpFilters) {
        const sourceField = filter.sourceField;
        const parentDropdown = this.formControls[sourceField];
        if (parentDropdown && !markedControl[sourceField]) {
          markedControl[sourceField] = true;
          if (!childDropdown[KeyFunctionReload]) {
            if (childDropdown instanceof DropdownControlSchema) {
              childDropdown[KeyFunctionReload] = (event: EventData) => {
                let needGetData = false;
                if (childDropdown.allowLoadDataWhenParentNull) {
                  needGetData = true;
                }
                else if (event.value == null
                  || event.value == ''
                  || (event.value instanceof Array && event.value.length == 0)
                ) {
                  if (childDropdown._component) {
                    childDropdown._component.resetControl();
                  }
                }
                else {
                  needGetData = true;
                }
                if (needGetData) {
                  const filters = getFilterFromTemplate(tmpFilters, event.parentModel, event.rootModel);
                  if (filters !== null && childDropdown._component) {
                    childDropdown._component.getData(filters);
                  }
                }
              };
            }
          }
          this.addMoreOnChangeEvent(parentDropdown, (event: EventData) => {
            childDropdown[KeyFunctionReload](event);
          });
        }
        this.bindOnChangeToDropdownRecursive(childDropdown, filter.filters, markedControl);
      }
    }
  }

  private addMoreOnChangeEvent(control: ControlSchema, newOnChange) {
    if (control.triggerLoadChild) {
      const oldTriggerLoadChild = control.triggerLoadChild;
      control.triggerLoadChild = async (event: EventData) => {
        await oldTriggerLoadChild(event);
        await newOnChange(event);
      };
    }
    else {
      control.triggerLoadChild = async (event: EventData) => {
        await newOnChange(event);
      };
    }
    const tmpFieldOldOnChange = 'oldOnChange';
    if (control[tmpFieldOldOnChange] === undefined) {
      if (control.onChanged) {
        const oldOnChange = control.onChanged;
        control[tmpFieldOldOnChange] = oldOnChange;
        control.onChanged = async (event: EventData) => {
          await oldOnChange(event);
          await control.triggerLoadChild(event);
        };
      }
      else {
        control.onChanged = control.triggerLoadChild;
        control[tmpFieldOldOnChange] = null;
      }
    }
    else {
      if (control[tmpFieldOldOnChange]) {
        const oldOnChange = control[tmpFieldOldOnChange];
        control.onChanged = async (event: EventData) => {
          await oldOnChange(event);
          await control.triggerLoadChild(event);
        };
      }
      else {
        control.onChanged = control.triggerLoadChild;
      }
    }
  }

  private initValidatorAndCorrector(schema: ControlSchema) {
    if (!schema.validators) schema.validators = [];

    if (schema.required) {
      schema.validators.push(new RequiredValidator());
    }

    if (schema instanceof MaskControlSchema) {
      if (schema.validators) {
        schema.validators.forEach(validator => {
          if (validator instanceof NumberCompareValidator) {
            this.createValidatorCompareRevert(validator, schema);
          }
        });
      }
    }
    else if (schema instanceof TextControlSchema) {
      const textSchema = (<TextControlSchema>schema);
      if (textSchema.dataFormat == 'email') {
        textSchema.validators.push(new EmailValidator());
      }
      else if (textSchema.dataFormat == 'phone' || textSchema.dataFormat == 'fax') {
        textSchema.validators.push(new PhoneNumberValidator());
      }

      if (textSchema.validators) {
        textSchema.validators.forEach(validator => {
          if (validator instanceof NumberCompareValidator) {
            this.createValidatorCompareRevert(validator, textSchema);
          }
        });
      }
    }
    else if (schema instanceof DateTimeControlSchema) {
      const dateTimeSchema = (<DateTimeControlSchema>schema);
      if (dateTimeSchema.validators) {
        dateTimeSchema.validators.forEach(validator => {
          if (validator instanceof DateCompareValidator || validator instanceof CompareValidator) {
            this.createValidatorCompareRevert(validator, dateTimeSchema);
          }
        });
      }
    }
    else if (schema instanceof TableControlSchema) {
      schema.rowTemplate.forEach(schemaChild => {
        this.initValidatorAndCorrector(schemaChild);
      });
    }

    schema.validators.forEach(validator => {
      if (validator instanceof RequiredFieldsValidator) {
        this.createValidatorRequireds(schema, validator.getRequiredFields(), validator.getMessage());
      }
    });
  }

  createValidatorCompareRevert(
    validator: DateCompareValidator | NumberCompareValidator | CompareValidator,
    schema: DateTimeControlSchema | TextControlSchema | MaskControlSchema
  ) {
    const compareUniqueField = validator.compareUniqueField;
    if (schema.uniqueField == compareUniqueField) {
      this.toastWarning('Schema cấu hình bị lỗi');
    }
    else {
      const operatorCompare = validator.getOperatorCompare();
      const schemaCompare = <ControlSchema>(this.formControls[compareUniqueField]);
      if (schemaCompare == null) {
        this.toastWarning('Schema cấu hình bị lỗi');
      }
      else {
        if (!schemaCompare.validators.some(p => p instanceof CompareValidator
          && p.compareUniqueField == schema.uniqueField)) {
          if (validator instanceof DateCompareValidator) {
            schemaCompare.validators.push(new DateCompareValidator(operatorContrast[operatorCompare], schema.uniqueField));
          }
          else if (validator instanceof NumberCompareValidator) {
            schemaCompare.validators.push(new NumberCompareValidator(operatorContrast[operatorCompare], schema.uniqueField));
          }
          else {
            schemaCompare.validators.push(new CompareValidator(operatorContrast[operatorCompare], schema.uniqueField));
          }
        }
      }
    }
  }

  createValidatorRequireds(schema: ControlSchema, fieldOther: string[], message: string) {
    if (fieldOther.indexOf(schema.uniqueField) > -1) {
      this.toastWarning('Schema cấu hình bị lỗi');
    }
    else {
      const fields = [...fieldOther, schema.field];
      fieldOther.forEach(field => {
        const schemaOther = <ControlSchema>(this.formControls[field]);
        const tmpFields = fields.filter(p => p != schemaOther.field);
        if (!schemaOther.validators.some(p => p instanceof RequiredFieldsValidator
          && isSameArray(tmpFields, p.getRequiredFields()))
        ) {
          const _validator = new RequiredFieldsValidator(tmpFields, message);
          schemaOther.validators.push(_validator);
        }
      });
    }
  }

  initControlDefaultValueFromExternal() {
    for (const control of this.setting.schema) {
      this.initControlDefaultValue(this.data, control);
    }
  }

  private initControlDefaultValue(parentModel, control, parentPath?: string) {
    let _parentPath = control.field;
    if (parentPath != null) _parentPath = parentPath + '.' + _parentPath;

    if (control instanceof TableControlSchema) {
      const addMore = control.initRowCount - parentModel[control.field].length;
      if (addMore > 0) {
        this.addMultiRow(parentModel, control, addMore);
      }
    }
    else {
      if (!parentModel.hasOwnProperty(control.field) && control.field != null) {
        if (control.defaultValue !== null && control.defaultValue !== undefined) {
          parentModel[control.field] = control.defaultValue;
        }
        else if (control instanceof DropdownControlSchema) {
          if (control.autoDisplayFirst
            && control._component
            && control._component._hasLoadedDatasource
            && control._component.dataSourceInternal.length > 0
          ) {
            parentModel[control.field] = control._component.dataSourceInternal[0].value[control.valueField];
          }
        }
      }
    }
  }

  //#region table schema

  getComponentByType(templateName: string) {
    if (!this.templates[templateName]) {
      this.templates[templateName] = this.findTemplateFromList(this.children, templateName);
    }
    return this.templates[templateName];
  }

  getContextTd(schema, data, index: number, parentPath: string) {
    return {
      $implicit: schema,
      data,
      index,
      showLabel: false,
      mdWidth: 12,
      parentPath: `${parentPath}[${index}]`,
      fullPath: `${parentPath}[${index}].${schema.field}`
    };
  }

  public deleteRow(data: any, index, control: TableControlSchema) {
    this.confirm('Bạn có chắc chắn muốn xóa dòng đã chọn').then(async rs => {
      if (!rs) return;
      const tableNode = this._rootNode.getNodeByPath(control.field);
      const toDeleteRowNode = tableNode.childNodes[index];
      tableNode.model.splice(index, 1);
      tableNode.childNodes.splice(index, 1);
      tableNode.reinitChildNodes();
      const generateEvent = (eventType: string) => {
        return new EventData({
          currentNode: tableNode,
          sourceNode: toDeleteRowNode,
          eventType,
          crudForm: this
        })
      }

      if (control.onChanged) {
        try {
          await control.onChanged(generateEvent('tableChanged'));
        }
        catch {
        }
      }

      if (control.onDeleted) {
        try {
          await control.onChanged(generateEvent('deleted'));
        }
        catch {
        }
      }
    });
  }

  public async addNewRow(data: any, control: TableControlSchema, disableOpenDialog: boolean = false) {
    if (control.showEdit && !disableOpenDialog) {
      this.tableFormTitle = `Thêm mới ${control.label}`;
      this.tableFormSchema = control.rowTemplate;
      this.tableFormShow = true;
      this.tableFormCurrentRow = -1;
      this.tableFormCurrentInfo = {
        control
      };
      return;
    }
    const tableNode = this._rootNode.getNodeByPath(control.field);

    const dataTable = this.generateModelAdd(control);
    const parentPath = tableNode.modelPath + '[' + tableNode.model.length + ']';
    for (const subControl of control.rowTemplate) {
      this.initControlDefaultValue(dataTable, subControl, parentPath);
    }
    tableNode.model.push(dataTable);
    tableNode.reinitChildNodes();

    await this.fireEventAddNewRow(tableNode, control);
  }

  private async fireEventAddNewRow(tableNode: ControlTreeNode, control: TableControlSchema) {
    const newRowNode = tableNode.childNodes[tableNode.childNodes.length - 1];
    const generateEvent = (eventType: string) => {
      return new EventData({
        currentNode: tableNode,
        sourceNode: newRowNode,
        eventType,
        crudForm: this
      })
    }
    if (control.onChanged) {
      try {
        await control.onChanged(generateEvent('tableChanged'));
      }
      catch {
      }
    }

    if (control.onAdded) {
      try {
        await control.onChanged(generateEvent('added'));
      }
      catch {
      }
    }
  }

  public addMultiRow(data: any, control: TableControlSchema, length) {
    for (let i = 0; i < length; i++) {
      this.addNewRow(data, control, true);
    }
  }

  async handleSavedTableRow(data) {
    this.tableFormShow = false;
    const control = this.tableFormCurrentInfo.control;
    const tableNode = this._rootNode.getNodeByPath(control.field);
    if (this.tableFormCurrentRow > -1) {
      tableNode.model[this.tableFormCurrentRow] = { ...tableNode.model[this.tableFormCurrentRow], ...data };
    }
    else {
      tableNode.model.push(data);
      tableNode.reinitChildNodes();

      await this.fireEventAddNewRow(tableNode, control);
    }
  }

  public saveRow(index, control: TableControlSchema, tablePath) {
    const tableNode = this._rootNode.getNodeByPath(tablePath);
    const curentRowNode = tableNode.childNodes[index];
    if (control.onSave) {
      try {
        control.onSave(new EventData({
          currentNode: tableNode,
          sourceNode: curentRowNode,
          eventType: 'save',
          crudForm: this
        }));
      }
      catch {
      }
    }
  }

  editRow(data: any, index: number, control: TableControlSchema) {
    this.tableFormTitle = `Sửa ${control.label}`;
    this.tableFormSchema = control.rowTemplate;
    this.tableFormCurrentRow = index;
    const tableNode = this._rootNode.getNodeByPath(control.field);
    const toDeleteRowNode = tableNode.childNodes[index];
    this.tableFormData = toDeleteRowNode.value;
    this.tableFormCurrentInfo = {
      control,
      index
    };
    this.tableFormShow = true;
  }
  //#endregion

  async validateForm(setValidateForm = true): Promise<boolean> {
    if (setValidateForm) {
      this._inValidForm = false;
      await this.validateModel(this._rootNode);
      if (this._inValidForm) return false;
    }
    return true;
  }

  private async validateModel(currentNode: ControlTreeNode) {
    for (const childNode of currentNode.childNodes) {
      if (!childNode.control) {
        if (childNode.childNodes == null) {
          continue;
        }
      }
      else if (childNode.control['_hidden']) continue;

      if (!await this.validate(childNode, true)) {
        this._inValidForm = true;
      }

      await this.validateModel(childNode);
    }
  }

  async validateFormControl(fieldPath): Promise<boolean> {
    const controlNode = this._rootNode.getNodeByPath(fieldPath);
    if (controlNode) {
      if (!await this.validate(controlNode)) {
        return false;
      }
    }
    return true;
  }

  async handleChangeDropdown(control: DropdownControlSchema, event?, eventType?, parentPath?: string) {
    if (control.multiple) {
      if (eventType == 'hide') {
        await this.handleFieldValueChange(control, event, 'change', parentPath);
      }
    }
    else {
      await this.handleFieldValueChange(control, event, eventType, parentPath);
    }
  }

  public handleFieldValueChange = async (control: ControlSchema, event?, eventType?, parentPath?: string) => {
    let parentNode = this._rootNode.getNodeByPath(parentPath);
    let currentNode = parentNode.getChildNode(control.field);
    // validate value
    await this.validate(currentNode);

    const eventData = new EventData({
      currentNode,
      sourceEvent: event,
      sourceNode: currentNode,
      crudForm: this,
      eventType
    });

    if (control.onChanged) {
      try {
        await control.onChanged(eventData);
      }
      catch (err) { }
    }

    this.onChange.emit(eventData);
  };

  handleFirstChanged(data, schema: DropdownControlSchema, parentPath?: string) {
    let parentNode = this._rootNode.getNodeByPath(parentPath);
    let currentNode = parentNode.getChildNode(schema.field);
    const eventData = new EventData({
      currentNode,
      sourceEvent: null,
      sourceNode: currentNode,
      crudForm: this,
      eventType: 'changed'
    });
    let selectedValueObject = null
    if (this.data[schema.field]) {
      selectedValueObject = schema._component.dataSourceInternal.find(q => q.value == this.data[schema.field]);
    }
    this.data[this.getFieldObjectDropdown(schema.field)] = selectedValueObject;
    if (schema.onChanged) {
      try {
        schema.onChanged(eventData);
      }
      catch (err) { }
    }
  }

  handleDataSourceLoaded(dataSource: any[], schema: DropdownControlSchema, parentPath?: string) {
    let parentNode = this._rootNode.getNodeByPath(parentPath);
    let currentNode = parentNode.getChildNode(schema.field);
    const eventData = new EventData({
      currentNode,
      sourceEvent: null,
      sourceNode: currentNode,
      crudForm: this,
      eventType: 'dataSourceLoaded',
      data: dataSource
    });
    if (schema.callbackDataFinish) {
      try {
        schema.callbackDataFinish(eventData);
      }
      catch (err) { }
    }
  }

  // true là thỏa mãn, false là không thỏa mãn (Ở cấp hiện tại chứ chưa kiểm tra cấp con)
  private async validate(currentNode: ControlTreeNode, force: boolean = false): Promise<boolean> {
    const control = currentNode.control;
    if (control instanceof DropdownControlSchema) {
      if (!force) {
        return true;
      }
    }

    if (control) {
      this._errors[currentNode.modelPath] = [];
      const errors = this._errors[currentNode.modelPath];
      if (control.validators && control.validators.length > 0) {
        for (let i = 0; i < control.validators.length; i++) {
          const validator = control.validators[i];
          const eventData = new EventData({
            currentNode,
            eventType: 'validate',
            crudForm: this
          });
          try {
            if (await validator.validate(eventData) === false) {
              const err = validator.getError();
              if (errors.indexOf(err) == -1) {
                errors.push(err);
              }
            }
          }
          catch {
          }
        }

        if (errors.length > 0) {
          return false;
        }
      }
    }
    return true;
  }

  private focusFirstControl() {
    const formElement = this.container.nativeElement;
    const divs = formElement.querySelectorAll('div.control');
    if (divs) {
      for (const div of divs) {
        let firstControl = div.querySelector('input:not([type=file]):not([type=hidden])');
        if (firstControl) {
          firstControl.focus();
        }
        else {
          firstControl = div.querySelector('textarea');
          if (firstControl) {
            firstControl.focus();
          }
        }

        if (firstControl) {
          break;
        }
      }
    }
  }

  checkDisabled(data: any, control: ControlSchema) {
    return data._status[control.field].disabled === true || (data._status[control.field].disabled === undefined && control.disabled);
  }

  checkHidden(control: ControlSchema, parentModel: any, path: string) {
    let currentNode = null;
    if (path && control['nodes']) {
      currentNode = control['nodes'][path];
    }
    if (currentNode == null) {
      control['_hidden'] = true;
      return true;
    }
    const result = parentModel._status[control.field].hidden === true
      || (parentModel._status[control.field].hidden === undefined
        && (control.hidden
          || (control.hiddenCheck && control.hiddenCheck(this._minimizedData, currentNode))
        )
      );
    control['_hidden'] = !!result;
    return result;
  }

  getControlDataSource(control: DropdownControlSchema, data: any) {
    if (data._source[control.field] instanceof Array) return data._source[control.field];
    if (control.dataSource instanceof Array) return control.dataSource;
  }

  triggerReload(field: string) {
    const control = this.formControls[field];
    if (!control) return;
    if (!(control instanceof DropdownControlSchema)) return;
    if (control && control.bindingFilters && control.bindingFilters.length) {
      const parentNode = this._rootNode.getNodeByPath(control.bindingFilters[0].field);
      const eventData = new EventData({
        currentNode: parentNode,
        sourceEvent: null,
        sourceNode: parentNode,
        eventType: 'change'
      });

      if (this[KeyFunctionReload]) {
        this[KeyFunctionReload](eventData);
      }
      else if (control._component) {
        if (control._component.getData) {
          control._component.getData();
        }
      }
    }
  }

  async saveFile() {
    const promises = [];
    this.setting.schema.forEach(schema => {
      if (!(schema instanceof FileControlSchema)) return;
      if (!schema._component) return;
      promises.push(schema._component.saveFile());
    });
    if (promises.length) {
      const arrResult = await Promise.all(promises);
      if (arrResult.some(q => !q)) return false;
    }
    return true;
  }
}
