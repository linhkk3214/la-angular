import { Operator } from "./enums";
import { ControlSchema } from "./schema";

export class GridInfo {
  fields?: string;
  filters?: Filter[] = [];
  sorts?: Sort[] = [];
  includes?: Include[] = [];
  pageInfo?: PageInfo = new PageInfo();

  constructor(init?: GridInfo) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class PageInfo {
  page = 1;
  pageSize = 10;

  constructor(init?: PageInfo) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class Include {
  field: string;
  thenInclude?: Include;
  filters?: Filter[];

  constructor(init: Include) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class Sort {
  field = 'id';
  dir = 1;

  constructor(init?: Sort) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class Filter {
  field?: string;
  logic?: 'or' | 'and';
  sourceField?: string;
  subField?: string | number;
  funcGetValue?: (item: any) => void;
  value?: string;
  valueIsField?: boolean = false;
  operator?: Operator;
  filters?: Filter[] = [];

  constructor(init?: Filter) {
    for (const key in init) {
      this[key] = init[key];
    }
  }
}

export class FilterWithBinding extends Filter {
  sourceValueField?: string;
  constructor(init?: FilterWithBinding) {
    super();
    for (const key in init) {
      this[key] = init[key];
    }
  }
}
