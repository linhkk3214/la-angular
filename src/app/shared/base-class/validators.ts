import { Operator } from "../models/enums";
import { ControlSchema, ControlTreeNode, EventData } from "../models/schema";

export interface IValidator {
  validate(event: EventData): Promise<boolean> | boolean;
  getError(): string;
}

function isNotEmpty(value: any, control: ControlSchema): boolean {
  if (value == null) return false;
  else {
    if (Array.isArray(value)) {
      if (value.length == 0) {
        return false;
      }
    }
    else if (value === '') {
      return false;
    }
  }
  return true;
}

export class RequiredValidator implements IValidator {
  private _label;
  validate(event: EventData): boolean {
    this._label = event.control.label;
    return isNotEmpty(event.value, event.control);
  }

  getError() {
    if (this._label) {
      return `${this._label} bắt buộc nhập`;
    }
    else {
      return 'Trường thông tin bắt buộc nhập';
    }
  }
}

export class RequiredFieldsValidator implements IValidator {
  _requiredFields: string[];
  _message: string;
  constructor(requiredFields: string[], message: string) {
    this._requiredFields = requiredFields;
    if (this._requiredFields.length == 0) alert('Cấu hình RequiredFieldsValidator sai');
    this._message = message;
  }

  getRequiredFields() {
    return this._requiredFields;
  }

  getMessage() {
    return this._message;
  }

  validate(event: EventData) {
    const allRequiredFields = [...this._requiredFields, event.control.field];
    let hasError = true;
    const errors = event.currentNode.crudForm._errors;
    for (const field of allRequiredFields) {
      const index = errors[field].indexOf(this._message);
      if (index > -1) {
        errors[field].splice(index, 1);
      }

      const currentNode = event.currentNode.getNodeByPath(field);
      if (isNotEmpty(currentNode.model, currentNode.control)) {
        hasError = false;
      }
    }

    if (hasError) {
      this._requiredFields.forEach(field => {
        errors[field].push(this._message);
      });
    }

    return !hasError;
  }

  getError() {
    return this._message;
  }
}

export class EmailValidator implements IValidator {
  validate(event: EventData): boolean {
    const value = event.value;
    if (value == null || value === '') return true;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  getError() {
    return 'Không đúng định dạng thư điện tử';
  }
}

export class PhoneValidator implements IValidator {
  validate(event: EventData): boolean {
    const value = event.value;
    if (value == null || value === '') return true;

    const re = /^0[1-9][0-9]{8,9}$/;
    return re.test(value);
  }

  getError() {
    return 'Không đúng định dạng số điện thoại';
  }
}

export class LengthValidator implements IValidator {
  private _error: any = '';
  private _min = 0;
  private _max = 100;

  constructor(max, min = 0) {
    this._max = max;
    this._min = min;
  }

  validate(event: EventData): boolean {
    let value = event.value;
    if (value == null || value === '') {
      if (this._min > 0) {
        this._error = `Độ dài tối thiểu ${this._min} ký tự`;
        return false;
      }
      return true;
    }

    value = value + '';
    const len = value.length;
    if (len < this._min) {
      this._error = `Độ dài tối thiểu ${this._min} ký tự`;
      return false;
    }
    if (len > this._max) {
      this._error = `Độ dài tối đa ${this._max} ký tự`;
      return false;
    }

    return true;
  }

  getError() {
    return this._error;
  }
}

export class PhoneNumberValidator implements IValidator {
  validate(event: EventData): boolean {
    const value = event.value;
    if (value == null || value === '') return true;

    const re = /^[+(]*[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(String(value).toLowerCase());
  }

  getError() {
    return 'Không đúng định dạng số điện thoại';
  }
}

export class NumberOnlyValidator implements IValidator {
  validate(event: EventData): boolean {
    const value = event.value;
    if (value == null || value === '') return true;

    const re = /^\-?([0-9])*$/;
    return re.test(String(value).toLowerCase());
  }

  getError() {
    return 'Không đúng định dạng số';
  }
}

export class AtLeastOneRowTableValidator implements IValidator {
  validate(event: EventData): boolean {
    if (event.currentNode.childNodes.length == 0) {
      return false;
    }
    return true;
  }

  getError() {
    return 'Bảng bắt buộc nhập';
  }
}

const validFunction = {
  [Operator.greater]: (value1: any, value2: any) => value1 > value2,
  [Operator.greaterThanEqual]: (value1: any, value2: any) => value1 >= value2,
  [Operator.lower]: (value1: any, value2: any) => value1 < value2,
  [Operator.lowerThanEqual]: (value1: any, value2: any) => value1 <= value2
};

const operatorMeaning = {
  [Operator.greater]: 'lớn hơn',
  [Operator.greaterThanEqual]: 'lớn hơn hoặc bằng',
  [Operator.lower]: 'nhỏ hơn',
  [Operator.lowerThanEqual]: 'nhỏ hơn hoặc bằng'
};

export interface ICompareValidator {
  compareUniqueField: string;
  getOperatorCompare(): Operator;
}

/**
 * So sanh 2 thuộc tính trong form.
 */
export class CompareValidator implements IValidator, ICompareValidator {
  private _operator: Operator;
  private _compareControl: ControlSchema;
  compareUniqueField: string;
  constructor(operator: Operator, compareUniqueField: string) {
    this._operator = operator;
    this.compareUniqueField = compareUniqueField;
  }

  getOperatorCompare(): Operator {
    return this._operator;
  }

  getFieldOperator() {
    return this._operator;
  }

  getValueCompare(value) {
    return value;
  }

  validate(event: EventData): boolean {
    const compareNode = event.currentNode.getNodeByPath(this.compareUniqueField);
    this._compareControl = compareNode.control;
    const compareField = this._compareControl.field;
    const compareValue = compareNode.model;
    const compareParentModel = compareNode.parentNode.model;
    const value = event.value;
    let errorMes;

    const errors = event.currentNode.crudForm._errors;
    for (const validator of this._compareControl.validators) {
      if (validator instanceof CompareValidator && validator.compareUniqueField == event.currentNode.control.uniqueField) {
        errorMes = validator.getError(event.currentNode);
        const index = errors[compareField].indexOf(errorMes);
        if (index > -1) {
          errors[compareField].splice(index, 1);
        }
        break;
      }
    }

    if (value == null
      || value === ''
      || compareValue == null
      || compareValue == ''
    ) return true;

    const re = validFunction[this._operator] && validFunction[this._operator](
      this.getValueCompare(value), this.getValueCompare(compareValue)
    );


    if (!re && errorMes) {
      errors[compareField].push(errorMes);
    }

    return re;
  }

  getError(controlTreeNode?: ControlTreeNode) {
    if (!this._compareControl && controlTreeNode) {
      this._compareControl = controlTreeNode.getNodeByPath(this.compareUniqueField).control;
    }
    return `Phải ${operatorMeaning[this._operator]} ${this._compareControl?.label}`;
  }
}

export class DateCompareValidator extends CompareValidator {
  constructor(operator: Operator, field: string) {
    super(operator, field);
  }

  override getValueCompare(value) {
    if (value instanceof Date) {
      return value;
    }
    return new Date(value);
  }
}

export class NumberCompareValidator extends CompareValidator {
  constructor(operator: Operator, field: string) {
    super(operator, field);
  }

  override getValueCompare(value) {
    if (value == undefined || value == null || value == '') {
      return 0;
    }
    return Number(value);
  }
}
