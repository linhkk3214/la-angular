import { Directive, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { PrefixFieldObjectDropdown } from 'src/app/models/const';
import { CrudFormComponent } from '../crud-form/crud-form.component';
import { FormState } from '../models/enums';
import { ResponseResult } from '../models/response-result';
import { ControlSchema, CrudFormData, CrudFormSetting, DateTimeControlSchema, EventData, ListSetting } from '../models/schema';
import { getTime, isValidDate, mergeJSON } from '../utils/common';
import { ComponentBase } from './component-base';
import { RequiredValidator } from './validators';

@Directive()
export abstract class FormBase extends ComponentBase implements OnInit {

  @ViewChild(CrudFormComponent, { static: false }) crudForm: CrudFormComponent;
  @ViewChild('formElement', { static: true }) formElement: ElementRef;
  @ViewChild('pUpload', { static: true }) pUpload: FileUpload;
  @ViewChild('buttonTemplate', { static: true }) buttonTemplate: TemplateRef<any>;

  @Input() parentSetting: ListSetting;
  @Input() model: CrudFormData = new CrudFormData();
  @Input() forceOnlyView: boolean = false;

  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSaved: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMessage: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFormReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDataBinded: EventEmitter<any> = new EventEmitter<any>();

  doNotCheckBaseService = false;
  private notConfigBaseServiceMessage = 'Chưa cấu hình CRUD base service';
  messageInsertSuccess = '';
  messageUpdateSuccess = '';
  setting: CrudFormSetting = new CrudFormSetting();

  formControls: any;
  formControlsList = {};
  mdWidthWorkflow: number;

  autoGetDetail = true;
  autoSave = true;
  messageConfirmSave: string;
  saving = false;
  setValidateForm = true;
  isBaseModel = true;
  public __isFormView: boolean = false;

  constructor(
    _injector: Injector
  ) {
    super(_injector);
  }

  ngOnInit() {
  }

  async _handleFormReady(formEvent: EventData) {
    await this.__handleFormReady(formEvent);
  }

  private async __handleFormReady(formEvent: EventData) {
    if (!this.doNotCheckBaseService && !this.setting.service) {
      this.toastWarning(this.notConfigBaseServiceMessage);
    }
    this.formControls = formEvent.formControls;
    await this.onFormInitialized(formEvent);
    this.onFormReady.emit({
      element: this,
      setting: this.setting,
      formEvent
    });
    this._triggerGetDetail();
  }

  _triggerGetDetail() {
    if (this.autoGetDetail) {
      this.getDetail();
    }
    else {
      // this.crudForm.initControlDefaultValueFromExternal();
    }
  }

  async onBeforeGetDetail() {

  }

  async getObjectDetail(): Promise<ResponseResult> {
    return await this.setting.service.getDetail(this.model.data._id);
  }

  async getDetailCustom(): Promise<ResponseResult> {
    return null;
  }

  private async getDetail() {
    const resultCheck = await this.getDetailCustom();
    // Không override
    if (resultCheck == null) {
      if (!this._isFormAddNew()) {
        await this.onBeforeGetDetail();
        const response = await this.getObjectDetail();
        if (response.data) {
          await this.modifyDetailData(response.data);
        }
        await this._processAfterGetData(response.data);
        await this.onAfterGetDetail();
      }
      else {
        if (this.crudForm) {
          const event = new EventData({
            currentNode: this.crudForm._rootNode,
            eventType: 'formReady',
            crudForm: this.crudForm
          });
          await this.initDataAdd(event);
        }
        // this.crudForm.initControlDefaultValueFromExternal();
      }
    }
    // Override cách lấy dữ liệu getDetail
    else {
      if (resultCheck.success && resultCheck.data) {
        this.model.formState = FormState.EDIT;
        await this.modifyDetailData(resultCheck.data);
        await this._processAfterGetData(resultCheck.data);
        await this.onAfterGetDetail();
      }
      else {
        this.model.formState = FormState.ADD;
        if (this.crudForm) {
          const event = new EventData({
            currentNode: this.crudForm._rootNode,
            eventType: 'formReady',
            crudForm: this.crudForm
          });
          await this.initDataAdd(event);
        }
        // this.crudForm.initControlDefaultValueFromExternal();
      }
    }
  }

  async initDataAdd(evt: EventData) {

  }

  /**
   * Phải gọi hàm này khi override getDetail
   */
  async _processAfterGetData(data) {
    if (!data) {
      data = {};
    }
    else {
      // Duyệt các control datetime để convert value sang datetime
      this.setting.schema.forEach(schema => {
        this.fixDateValue(schema, data);
      });
    }
    data.__disableEdit = this.model.data.__disableEdit;

    mergeJSON(this.model.data, data);
    if (this.forceOnlyView) {
      this.__isFormView = true;
      this.model.formState = FormState.VIEW;
    }
  }

  private fixDateValue(control, parentModel, parentPath?) {
    let _parentPath = control.field;
    if (parentPath != null) _parentPath = parentPath + '.' + _parentPath;

    if (control instanceof DateTimeControlSchema) {
      if (!(parentModel[control.field] instanceof Date)) {
        const date = new Date(String(parentModel[control.field]));
        if (isValidDate(date)) {
          parentModel[control.field] = date;
        }
        else {
          parentModel[control.field] = null;
        }
      }
      else {
        parentModel[control.field] = getTime(parentModel[control.field]);
      }
    }
  }

  _addRequiredValidator(schema: ControlSchema) {
    let exist = false;
    for (const validator of schema.validators) {
      if (validator instanceof RequiredValidator) {
        exist = true;
        break;
      }
    }
    if (!exist) {
      schema.validators.push(new RequiredValidator());
    }
    schema.required = true;
  }

  _removeRequiredValidator(schema: ControlSchema) {
    const validators = [];
    for (const validator of schema.validators) {
      if (validator instanceof RequiredValidator) {

      }
      else {
        validators.push(validator);
      }
    }
    schema.validators = validators;
    schema.required = false;
  }

  async modifyDetailData(data) {
  }

  _triggerSave() {
    this.save();
  }

  private async save() {
    const validated = await this.validateFormBase();
    if (validated) {
      await this.onBeforeSave();
      if (this.autoSave) {
        if (this._isFormEdit() || this._isFormView()) {
          await this.onUpdate();
        }
        else if (this._isFormAddNew()) {
          await this.onInsert();
        }
        else {
          // form view, do nothing
        }
      }
      else {
        this.handleManualSave();
      }
    }
    else {
      this.model.submitting = false;
    }
  }

  handleManualSave() {

  }

  async _getResultValidate() {
    return await this.validateFormBase();
  }

  async validateForm(resultValidateBase: boolean) {
    return true;
  }

  private async validateFormBase() {
    const resultValidateBase = await this.crudForm.validateForm(this.setValidateForm);
    const resultValidate = await this.validateForm(resultValidateBase);
    return resultValidate && resultValidateBase;
  }

  _validateFormControl(fieldPath) {
    return this.crudForm.validateFormControl(fieldPath);
  }

  onBeforeSave(): void | Promise<boolean> {
  }

  onAfterSave(response: ResponseResult): void | Promise<boolean> {
  }

  async onAfterGetDetail() {

  }

  private async onInsert() {
    this.setDefaultValue(this.model.data);
    // Gọi hàm lưu file trước khi thêm mới đối tượng
    const resultSaveFile = await this.crudForm.saveFile();
    if (!resultSaveFile) {
      this.model.submitting = false;
      return this.toastWarning('Có lỗi khi lưu file');
    }
    await this.getPromiseActionInsert()
      .then(async response => {
        this.model.submitting = false;
        this.showMessageAfterInsert(response.success, response);
        if (response.success) {
          this.model.data._id = response.data._id;
          await this.onAfterSave(response);
          this.onSaved.emit();
        }
        else {
          this.handleInsertError();
        }
      }, error => {
        if (!error.error.success && error.error.errorCheckExist) {
          this.model.submitting = false;
          return;
        }
        this.model.submitting = false;
        this.showMessageAfterInsert(false, error);
      });
  }

  getMinimizedModel() {
    const model = { ...this.model.data };
    Object.keys(model).forEach(key => {
      if (key.startsWith(PrefixFieldObjectDropdown)) {
        delete model[key];
      }
    });
    return model;
  }

  getPromiseActionInsert(): Promise<ResponseResult> {
    return this.setting.service.insert(this.getMinimizedModel());
  }

  handleInsertError() {

  }

  private async onUpdate() {
    this.setDefaultValue(this.model.data);
    // Gọi hàm lưu file trước khi cập nhật đối tượng
    const resultSaveFile = await this.crudForm.saveFile();
    if (!resultSaveFile) {
      this.model.submitting = false;
      return this.toastWarning('Có lỗi khi lưu file');
    }
    this.getPromiseActionUpdate()
      .then(async response => {
        this.model.submitting = false;
        this.showMessageAfterUpdate(response.success, response);
        if (response.success) {
          await this.onAfterSave(response);
          this.onSaved.emit();
        }
        else {
          this.handleUpdateError();
        }
      }, error => {
        if (!error.error.success && error.error.errorCheckExist) {
          this.model.submitting = false;
          return;
        }
        this.model.submitting = false;
        this.showMessageAfterUpdate(false, error);
      });
  }

  handleUpdateError() {

  }

  getPromiseActionUpdate(): Promise<ResponseResult> {
    return this.setting.service.update(this.model.data._id, this.getMinimizedModel());
  }

  private setDefaultValue(model) {
    if (model.isBuildIn === null || model.isBuildIn === undefined) {
      model.isBuildIn = false;
    }

    if (model.isBuildInAll === null || model.isBuildInAll === undefined) {
      model.isBuildInAll = false;
    }
  }

  private showMessageAfterInsert(isSuccess: boolean = false, error?: any) {
    if (isSuccess) {
      if (this.messageInsertSuccess) {
        this.toastSuccess(this.messageInsertSuccess);
      }
    }
    else {
      this.handleResponseError(error);
    }
  }

  private showMessageAfterUpdate(isSuccess: boolean = false, error?: any) {
    if (isSuccess) {
      if (this.messageUpdateSuccess) {
        this.toastSuccess(this.messageUpdateSuccess);
      }
    }
    else {
      this.handleResponseError(error);
    }
  }

  handleResponseError(error) {
    if (error.message) {
      this.toastWarning(error.message);
    }
    else if (error.error) {
      this.toastWarning(error.error);
    }
    else {
      this.toastWarning('Có lỗi xảy ra, liên hệ quản trị viên để biết thêm chi tiết');
    }
  }

  async onFormInitialized(data: EventData) {

  }

  _handleSave(evt) {
    if (this.model.submitting) return;
    this.model.submitting = true;
    this.save();
    this.onSave.emit(evt);
  }

  _handleCancel(evt) {
    this.onCancel.emit(evt);
  }

  _handleMessage(evt) {
    this.onMessage.emit(evt);
  }

  _setDisableControl(uniqueField, isDisabled) {
    this.crudForm.formControls[uniqueField].disabled = isDisabled;
  }

  _setHiddenControl(uniqueField, isHidden) {
    this.crudForm.formControls[uniqueField].hidden = isHidden;
  }

  _getFormState(): FormState {
    return this.model.formState;
  }

  _isFormAddNew() {
    return this._getFormState() == FormState.ADD;
  }

  _isFormEdit() {
    return this._getFormState() == FormState.EDIT;
  }

  _isFormView() {
    return this._getFormState() == FormState.VIEW;
  }
}
