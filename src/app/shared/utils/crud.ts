import { Filter, FilterWithBinding } from "../models/grid-info";
import { isArray, isLiteralObject } from "./common";

export function getFilterFromTemplate(templateFilter: FilterWithBinding[], model: any, rootModel?: any) {
  const result = [];
  if (Array.isArray(templateFilter)) {
    templateFilter.forEach(f => {
      deQuyReplaceValue(result, f, model, rootModel);
    });
  }
  else {
    deQuyReplaceValue(result, templateFilter, model, rootModel);
  }
  return result;
}

function deQuyReplaceValue(filters: Filter[], filter: FilterWithBinding, model: any, rootModel?: any) {
  let valueFilter = getValueFilterFromBindingFilter(filter, model, rootModel);

  if (filter.logic == null && (valueFilter == null || valueFilter === '' || valueFilter.length == 0)) {
    return;
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

function getValueFilterFromBindingFilter(filter: FilterWithBinding, model: any, rootModel?: any) {
  let valueFilter = null;
  const sourceField = filter.sourceValueField;
  const subField = filter.subField;
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
      valueFilter = tryGetBySubField(temp[subField]);
    }
  }
  return valueFilter
}
