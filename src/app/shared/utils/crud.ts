import { Filter, FilterWithBinding } from "../models/grid-info";
import { isArray, isLiteralObject } from "./common";

export function getFilterFromTemplate(templateFilter: FilterWithBinding[], model: any, rootModel?: any) {
  const result = [];
  let hasNull = false;
  if (Array.isArray(templateFilter)) {
    templateFilter.forEach(f => {
      const resultDeQuy = deQuyReplaceValue(result, f, model, rootModel);
      if (resultDeQuy === null) {
        hasNull = true;
      }
    });
  }
  else {
    const resultDeQuy = deQuyReplaceValue(result, templateFilter, model, rootModel);
    if (resultDeQuy === null) {
      hasNull = true;
    }
  }
  if (hasNull) return null;
  return result;
}

function deQuyReplaceValue(filters: Filter[], filter: FilterWithBinding, model: any, rootModel?: any) {
  let valueFilter = getValueFilterFromBindingFilter(filter.sourceValueField, filter.subField, model, rootModel);

  if (filter.logic == null) {
    if (valueFilter == null) {
      if (filter.sourceValueField != filter.sourceField) {
        let valueRaw = getValueFilterFromBindingFilter(filter.sourceField, filter.subField, model, rootModel);
        // Nếu có value raw nghĩa là control chưa ready
        if (valueRaw) return null;
      }
      return;
    }
    else if (valueFilter.length == 0) return;
  }

  const tmpFilter = new Filter({
    field: filter.field,
    operator: filter.operator,
    value: filter.value,
    logic: filter.logic,
    filters: filter.filters,
  });
  delete tmpFilter.sourceField;
  if (tmpFilter.funcGetValue) {
    valueFilter = tmpFilter.funcGetValue(valueFilter);
  }
  tmpFilter.value = JSON.stringify(valueFilter);
  tmpFilter.filters = [];
  if (filter.logic && filter.filters) {
    filter.filters.forEach(f => this.deQuyReplaceValue(tmpFilter.filters, f, model, rootModel));
    if (tmpFilter.filters.length > 0) {
      filters.push(tmpFilter);
    }
  }
  else {
    filters.push(tmpFilter);
  }
}

function getValueFilterFromBindingFilter(sourceField: string, subField: string | number, model: any, rootModel?: any) {
  let valueFilter = null;
  const tryGetBySubField = (value) => {
    if (!subField) return value;
    if (isArray(value)) return value.map(q => q[subField]);
    if (isLiteralObject(value)) return value[subField];
    return value;
  };
  if (model.hasOwnProperty(sourceField)) {
    valueFilter = tryGetBySubField(model[sourceField]);
  }
  else if (rootModel) {
    if (rootModel.hasOwnProperty(sourceField)) {
      valueFilter = tryGetBySubField(rootModel[sourceField]);
    }
    else {
      const fields = sourceField.split('.');
      let temp = rootModel;
      for (const f of fields) {
        if (temp.hasOwnProperty(f)) {
          temp = temp[f];
        }
        else {
          temp = null;
          break;
        }
      }
      if (temp) {
        valueFilter = tryGetBySubField(temp[subField]);
      }
    }
  }
  return valueFilter
}
