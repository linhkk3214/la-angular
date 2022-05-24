export enum EnumGetRefType {
  LOCAL = 1,
  SERVER = 2
}

export enum DataType {
  date = 'date',
  datetime = 'datetime',
  html = 'html',
  string = 'string',
  int = 'int',
  decimal = 'decimal',
  boolean = 'boolean',
  enum = 'enum',
  fileUpload = 'fileUpload',
  fileManager = 'fileManager',
  color = 'color'
}

export enum ControlType {
  dropdown = 'dropdown',
  datetime = 'datetime',
  date = 'date',
  time = 'time',
  number = 'number',
  textbox = 'textbox',
  checkbox = 'checkbox',
  switch = 'switch'
}

export enum Operator {
  equal = 'eq',
  notEqual = 'neq',
  greater = 'gt',
  greaterThanEqual = 'gte',
  lower = 'lt',
  lowerThanEqual = 'lte',

  contain = 'contains',
  notContain = 'ncontains',
  startWith = 'startswith',
  notStartWith = 'nstartswith',
  endWith = 'endswith',
  notEndWith = 'nendswith',

  in = 'in',
  notIn = 'nin',

  isNull = 'isnull',
  isNotNull = 'isnotnull',

  inRole = 'hasRole',
  notInRole = 'notHasRole',
  inCategory = 'inCategory',
  notInCategory = 'notInCategory',
  inPosition = 'inPosition',
  notInPosition = 'notInPosition',
  inListUser = 'inListUser',
  notInListUser = 'notInListUser',
  inListGroup = 'inListGroup',
  notInListGroup = 'notInListGroup',
  isCurrentUser = 'isCurrentUser',
  isCurrentCanBo = 'isCurrentCanBo'
}

export enum HeightType {
  default = 0,
  dynamic = -1,
  custom = 1
}

export enum FormState {
  ADD = 0,
  VIEW = 1,
  EDIT = 2
}
