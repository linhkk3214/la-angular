import { Component, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentBase } from '../base-class/component-base';
import { CompareValidator, DateCompareValidator, EmailValidator, NumberCompareValidator, PhoneNumberValidator, RequiredFieldsValidator, RequiredValidator } from '../base-class/validators';
import { KeyFunctionReload } from '../models/const';
import { FormState, Operator } from '../models/enums';
import { Filter } from '../models/grid-info';
import { ControlSchema, ControlTreeNode, CrudFormSetting, DateTimeControlSchema, DropdownControlSchema, EventData, FormSchema, LabelSchema, MaskControlSchema, TextControlSchema, TitleSchema } from '../models/schema';
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
export class CrudFormComponent extends ComponentBase implements OnInit, OnDestroy {
  @ViewChild('container') container: ElementRef;

  @Input() setting: CrudFormSetting = new CrudFormSetting();
  @Input() data: any;
  @Input() formState: FormState = FormState.EDIT;

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

  formControls: any = [];
  _prefixCustomHeader = 'customHeader_';

  fieldParentField = 'parentField';

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setting.schema.forEach(schema => {
      schema.nameType = schema.constructor.name;
    });
    this.initLoad();
  }

  handleFileUploaded(evt) {
    console.log(evt);
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
      this.initControlSchema(control);
    }

    for (const control of this.setting.schema) {
      this.initValidatorAndCorrector(control);
      this.initBindingControlSchema(control);
    }

    this._rootNode = new ControlTreeNode(this.data, this.formControls);
    this._rootNode.setCrudForm(this);
  }

  private initControlSchema(schema: FormSchema, parentId?) {
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
      if (parentId != null) key = parentId + '.' + key;
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
    let tmpFilters: Filter[] = [];
    if (Array.isArray(dropdownControlSchema.bindingFilters)) {
      tmpFilters = dropdownControlSchema.bindingFilters;
    }
    // else if (typeof (dropdownControlSchema.bindingFilters) == 'function') {
    //   tmpFilters = dropdownControlSchema.bindingFilters();
    // }
    // else {
    //   tmpFilters = await dropdownControlSchema.bindingFilters;
    // }
    tmpFilters.forEach(filter => {
      const sourceField = filter.sourceField;
      const schema = this.setting.schema.find(q => q.field == sourceField);
      if (!filter.subField
        && (schema instanceof DropdownControlSchema)) {
        filter.subField = schema.valueField;
      }
    });
    const markedControl = {};
    this.bindOnChangeToDropdownRecursive(dropdownControlSchema, tmpFilters, markedControl);
  }

  private bindOnChangeToDropdownRecursive(childDropdown: DropdownControlSchema, tmpFilters: Filter[], markedControl) {
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
                if (childDropdown.allowLoadDataWhenParentNull
                  || event.eventType == 'adjustValue') {
                  needGetData = true;
                }
                else if (event.value == null
                  || event.value == ''
                  || (event.value instanceof Array && event.value.length == 0)) {
                  if (childDropdown._component) {
                    childDropdown._component.resetControl();
                  }
                }
                else {
                  needGetData = true;
                }
                if (needGetData) {
                  const filters = getFilterFromTemplate(tmpFilters, event.parentModel, event.rootModel);
                  if (childDropdown._component) {
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

  async handleChangeDropdown(control: DropdownControlSchema, event?, eventType?) {
    if (control.multiple) {
      if (eventType == 'hide') {
        await this.handleFieldValueChange(control, event, 'change');
      }
    }
    else {
      await this.handleFieldValueChange(control, event, eventType);
    }
  }

  /**
   * Để nguyên hàm dạng arrow function vì có 1 số form khác gọi
   */
  public handleFieldValueChange = async (control: ControlSchema, event?, eventType?) => {
    let parentNode = this._rootNode.getNodeByPath('');
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
      catch {
      }
    }

    this.onChange.emit(eventData);
  };

  handleFirstChanged(data, schema: ControlSchema) {
    let parentNode = this._rootNode.getNodeByPath('');
    let currentNode = parentNode.getChildNode(schema.field);
    const eventData = new EventData({
      currentNode,
      sourceEvent: null,
      sourceNode: currentNode,
      crudForm: this,
      eventType: 'changed'
    });
    if (schema.onChanged) {
      schema.onChanged(eventData);
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
      const errors = this._errors[currentNode.field];
      if (!errors) return true;
      errors.splice(0, errors.length);
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

  getContextTd(control, data, index, tablePath) {
    return {
      control,
      data,
      index,
      tablePath,
      parentPath: `${tablePath}[${index}]`,
      path: `${tablePath}[${index}].${control.field}`,
      showLabel: false,
      mdWidth: 12
    };
  }

  ngOnDestroy(): void {

  }

  getControlDataSource(control: DropdownControlSchema, data: any) {
    if (data._source[control.field] instanceof Array) return data._source[control.field];
    if (control.dataSource instanceof Array) return control.dataSource;
  }

  triggerReload(field: string) {
    const control = this.formControls[field];
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
}
