export const isLiteralObject = (obj) => {
  return (obj instanceof Object)
    && !isArray(obj)
    && !isNumber(obj)
    && !isDate(obj)
    && !isFunction(obj)
    && !isBoolean(obj)
    && !isRegular(obj)
    && !isString(obj);
};

export const isNumber = (obj) => {
  return obj instanceof Number;
};

export const isDate = (obj) => {
  return obj instanceof Date;
};

export const isFunction = (obj) => {
  return obj instanceof Function;
};

export const isBoolean = (obj) => {
  return obj instanceof Boolean;
};

export const isString = (obj) => {
  return obj instanceof String;
};

export const isRegular = (obj) => {
  return obj instanceof RegExp;
};

export const isArray = (obj) => {
  return obj instanceof Array;
};

export const isSimpleType = (obj) => {
  const t = typeof (obj);
  return t == 'number' || t == 'boolean' || t == 'string' || t == 'symbol' || t == 'bigint';
};

export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const isValidTime = (date) => {
  return date instanceof Date && /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(`${date.getHours()}:${date.getMinutes()}`);
};

export function getTime(timeSpan: string) {
  if (!timeSpan) return timeSpan;
  const arrTimeInfo = timeSpan.split(':');
  return `${arrTimeInfo[0]}:${arrTimeInfo[1]}`;
}

export function isSameArray(array1: any[], array2: any[]) {
  if (array1.length != array2.length)
    return false;
  for (var item of array1) {
    if (!array2.some(q => q == item))
      return false;
  }
  return true;
}

export function mergeJSON(target, sourceRaw) {
  const source = clone(sourceRaw);
  if (isObjectOld(source)) {
    for (const key in source) {
      if (isObjectOld(source[key])) {
        if (!isObjectOld(target[key])) {
          target[key] = source[key];
        }
        else {
          mergeJSON(target[key], source[key]);
        }
      }
      else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

function isObjectOld(obj) {
  if (!obj) return false;
  const s = JSON.stringify(obj);
  if (s && s.startsWith('{')) return true;
  return false;
};

function clone(obj) {
  if (obj) return JSON.parse(JSON.stringify(obj));
  return null;
};
