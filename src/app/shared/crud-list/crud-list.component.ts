import { DatePipe, DecimalPipe } from "@angular/common";
import { AfterContentInit, Component, ContentChildren, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChild } from "@angular/core";
import { Table } from "primeng/table";
import { Subject } from "rxjs";
import { ComponentBase } from "../base-class/component-base";
import { FieldOrderCrudList, KeyFieldGetRefType } from "../models/const";
import { ControlType, DataType, EnumGetRefType, Operator, TextAlign } from "../models/enums";
import { Filter, GridInfo, Sort } from "../models/grid-info";
import { ColumnSchema, DateTimeRangeControlSchema, DropdownControlSchema, ListData, ListSetting } from "../models/schema";
import { TnScrollBarComponent } from "../tn-scrollbar/tn-scrollbar.component";
import { getFilterFromTemplate } from "../utils/crud";

@Component({
  selector: 'crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.scss'],
  providers: [DecimalPipe, DatePipe]
})
export class CrudListComponent extends ComponentBase implements OnInit, AfterContentInit, OnDestroy {
  table: Table;

  @ViewChild(Table, { static: false }) set _table(v: Table) {
    this.table = v;
    this.tableReady.next(this);
  }
  @ViewChild('scrollbar', { static: true }) scrollbar: TnScrollBarComponent;

  @ContentChildren(TemplateRef) childrenTemplate: QueryList<TemplateRef<any>>;

  @Input() model: ListData = new ListData();
  @Input() setting: ListSetting = new ListSetting();

  @Input() templates: QueryList<TemplateRef<any>>;

  _style: any = {};
  @Input() set style(value: any) {
    if (value) {
      this._style = value;
    }
  }

  @Input() set tableClass(value: string) {
    this._tableClass = this._defaultTableClass;
    if (value != null && value.trim() != '') {
      this._tableClass += ` ${value}`;
    }
  }

  _dataSource: any[] = [];
  @Input() set dataSource(value: any[]) {
    let dataSource = [];
    if (value) {
      dataSource = value;
    }
    this.processDataSource(dataSource);
    this._dataSource = dataSource;
  }

  @Input() expandedSearch = true;
  @Input() showScrollBar = true;

  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCheckAll: EventEmitter<any> = new EventEmitter<any>();
  @Output() onReload: EventEmitter<GridInfo> = new EventEmitter<GridInfo>();
  @Output() onReloaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() onReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() onContentInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onView: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeleteMultiple: EventEmitter<any> = new EventEmitter<any>();
  private tableReady = new Subject<any>();
  tableReadySource$ = this.tableReady.asObservable();

  _defaultTableClass = 'new-table scr-table crud-list-table';
  _tableClass = '';

  template: any = {};

  filterSchema: any = {};
  filterData: any = {};
  templateFilter: Filter[] = [];

  filter_custom: Filter[] = [];
  // filter của advance search trả về
  filter_advanceSearch: Filter[] = [];
  // filter theo các filter hiển thị trong cột của grid
  filter_column: Filter[] = [];
  fieldSearchText: string[];
  tooltipSearchText: string;
  keyword: string = '';

  sortHistory: Sort[] = [];
  _sortField = '';
  _sortDir: -1 | 0 | 1 | 2 = -1;
  fieldOrder = FieldOrderCrudList;

  textAlign = TextAlign;

  constructor(
    public _injector: Injector,
    public _datePipe: DatePipe
  ) {
    super(_injector);
  }

  ngOnInit() {
    this.filterSchema.dateRange = new DateTimeRangeControlSchema({ appendTo: 'body' });
    this.filterSchema.dropdown = {};

    if (!this._tableClass) {
      this._tableClass = this._defaultTableClass;
    }
    this.initSearchField();
    this.initColumnSchema(this.setting.cols);
    this.getData();
  }

  ngAfterContentInit() {
    this.onContentInit.emit(this);
  }

  initSearchField() {
    if (this.setting.cols == null) {
      return this.toastWarning('Bạn chưa cấu hình cột cho danh sách');
    }
    let tooltipSearchText = this.setting.tooltipSearchText;
    const fieldSearchText = this.setting.fieldSearchText;
    for (const col of this.setting.cols) {
      if (col.allowFilter && !col.rawColumn) {
        if (col.fullTextSearch) {
          if (fieldSearchText.indexOf(col.field) == -1) {
            fieldSearchText.push(col.field);
            if (!tooltipSearchText) {
              tooltipSearchText = 'Tìm kiếm theo các trường:';
            }
            tooltipSearchText += ` "${col.label ? col.label : col.field}",`;
          }
        }
      }
    }

    if (!fieldSearchText.length) return;

    if (tooltipSearchText) {
      tooltipSearchText = tooltipSearchText.substring(0, tooltipSearchText.length - 1);
    }
    this.fieldSearchText = fieldSearchText;
    this.tooltipSearchText = tooltipSearchText;
  }

  initColumnSchema(cols: ColumnSchema[]) {
    if (cols) {
      this.extendColumns(this.setting.cols);
      this.buildFilterColumn(this.setting.cols);
    }
  }

  private extendColumns(cols: ColumnSchema[], appendCol = true): void {
    if (!cols) {
      return;
    }
    this.setting.advanceData.fieldNeedGetRef = [];
    let tmpCol: ColumnSchema = null;
    const temp = [];
    for (const column of cols) {
      if (column.rawColumn) {
        continue;
      }
      if (column.dataType == DataType.boolean) {
        column.textAlign = TextAlign.Center;
      }
      temp.push(column);
      if (column.dataType == null || column.dataType == undefined || column.dataType == '') {
        column.dataType = DataType.string;
      }

      if (column.visible) {
        if (column.service != null) {
          column.controlType = ControlType.dropdown;
          if (!column.rawColumn) {
            this.setting.advanceData.fieldNeedGetRef.push(column);
            column[KeyFieldGetRefType] = EnumGetRefType.SERVER;
            if (column.valueField == null) {
              column.valueField = 'id';
            }
            if (column.displayField == null) {
              column.displayField = 'ten';
            }
            tmpCol = new ColumnSchema({
              ...column,
              rawColumn: column,
              controlType: ControlType.dropdown,
              dataType: column.dataTypeRefField,
              field: 'str' + column.field,
              allowFilter: column.allowFilter,
              sort: false
            });
            temp.push(tmpCol);
            column.visible = false;
          }
        }
        else if (column.dataSource && column.dataSource.length > 0) {
          column.controlType = ControlType.dropdown;
          if (!column.rawColumn) {
            this.setting.advanceData.fieldNeedGetRef.push(column);
            column[KeyFieldGetRefType] = EnumGetRefType.LOCAL;
            tmpCol = new ColumnSchema({
              ...column,
              rawColumn: column,
              controlType: ControlType.dropdown,
              dataType: column.dataTypeRefField,
              service: null,
              field: 'str' + column.field,
              allowFilter: column.allowFilter,
              sort: false,
              visible: true
            });
            temp.push(tmpCol);
            column.visible = false;
          }
        }
      }
    }
    cols.length = 0;
    cols.push(...temp);
  }

  handleReady() {
    this.onReady.emit(this);
  }

  handleChangedSearchBox() {
    this.filter_advanceSearch = [];
    if (this.keyword != null && this.keyword != '' && this.fieldSearchText.length > 0) {
      const filterKeyWork = new Filter({
        logic: 'or',
        filters: []
      });
      const valueKeyWork = JSON.stringify(this.keyword);
      this.fieldSearchText.forEach(field => {
        filterKeyWork.filters.push(new Filter({
          field,
          operator: Operator.contain,
          value: valueKeyWork
        }));
      });
      if (filterKeyWork.filters.length == 1) {
        this.filter_advanceSearch.push(filterKeyWork.filters[0]);
      }
      else {
        this.filter_advanceSearch.push(filterKeyWork);
      }
    }
    this.reload();
  }

  public getComponentByType(controlType: string) {
    let item = this.findTemplateFromList(this.childrenTemplate, controlType);
    if (!item && this.templates) {
      item = this.findTemplateFromList(this.templates, controlType);
    }

    return item;
  }

  private getFilters(): Filter[] {
    const result = [];
    if (this.filter_custom) {
      result.push(...this.filter_custom);
    }
    if (this.filter_column) {
      result.push(...this.filter_column);
    }
    if (this.filter_advanceSearch) {
      result.push(...this.filter_advanceSearch);
    }
    return result;
  }

  getGridInfo() {
    const gridInfo = new GridInfo({
      pageInfo: {
        page: this.setting.pageSetting.page,
        pageSize: this.setting.pageSetting.pageSize
      },
      filters: this.getFilters(),
      sorts: []
    });
    if (this._sortField && this._sortDir !== 0) {
      gridInfo.sorts.push({ field: this._sortField, dir: this._sortDir });
    }

    return gridInfo;
  }

  public getData() {
    const infoGetData = this.getGridInfo();
    this.onReload.emit(infoGetData);
  }

  reload(filter_custom?: Filter[], page = 1) {
    this.filter_custom = filter_custom;
    this.setting.pageSetting.page = page;
    this.getData();
  }

  public add() {
    this.onAdd.emit();
  }

  public edit(rowData: any) {
    this.onEdit.emit(rowData);
  }

  public delete(rowData: any) {
    this.onDelete.emit(rowData);
  }

  public onSort(event: any, _table: Table) {
    this.sortWithApi(event, _table);
  }

  private sortWithApi(event: any, _table: Table) {
    if (!this.model.loading) {
      _table.reset();
      if (this.sortHistory.length == 0) {
        this._sortField = event.field;
        this._sortDir = 1;
      }
      else if (this.sortHistory[0].field == event.field) {
        this._sortField = event.field;
        if (this._sortDir === 1) {
          this._sortDir = -1;
        }
        else if (this._sortDir === -1) {
          this._sortDir = 0;
        }
        else {
          this._sortDir = 1;
        }
      }
      else if (event.field != this.sortHistory[0].field) {
        this._sortField = event.field;
        this._sortDir = 1;
      }
      this.getData();
      this.sortHistory.unshift({ field: this._sortField, dir: this._sortDir });
    }
  }

  public processDataSource(dataSource) {
    if (!dataSource) return;
    dataSource.forEach(source => {
      if (source._id == undefined) {
        source._id = this.guid();
      }
      source.objStyleClass = {};
      if (!source.colSpan) {
        source.colSpan = {};
      }
      if (!source.rowSpan) {
        source.rowSpan = {};
      }
      if (!source.hidden) {
        source.hidden = {};
      }
      if (source.isNew) {
        source.objStyleClass.isNew = true;
      }
      if (source.isExpiring) {
        source.objStyleClass.expiring = true;
      }
      if (source.class) {
        source.class.split(' ').filter(p => p).forEach(cls => {
          source.objStyleClass[cls] = true;
        });
      }
    });
  }

  public getContextCell(rowData, rowIndex, col, expanded, $this) {
    return {
      data: rowData,
      crudList: $this,
      rowData,
      rowIndex,
      col,
      field: col.field,
      expanded
    };
  }

  public onNext(event) {
    this.setting.pageSetting.page = this.setting.pageSetting.page + 1;
    this.getData();
    this.scrollTop();
  }

  public onPrev(event) {
    if (this.setting.pageSetting.page > 1) {
      this.setting.pageSetting.page = this.setting.pageSetting.page - 1;
    }
    this.getData();
    this.scrollTop();
  }

  public onOldest(event) {
    this.setting.pageSetting.page = Math.ceil(this.model.total / this.setting.pageSetting.pageSize);
    this.getData();
    this.scrollTop();
  }

  public onLatest(event) {
    this.setting.pageSetting.page = 1;
    this.getData();
    this.scrollTop();
  }

  scrollTop() {
    setTimeout(() => {
      if (this.scrollbar) {
        // this.scrollbar.scrollToTop(0, 0);
      }
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.scrollbar) {
        // this.scrollbar.scrollToBottom(0, 0);
      }
    });
  }

  private findTemplate(templateName) {
    return this.findTemplateFromList(this.childrenTemplate, templateName);
  }

  public hasTemplate(templateName: string): boolean {
    if (this.template[templateName] === undefined) {
      this.template[templateName] = this.findTemplate(templateName);
    }
    return this.template[templateName] != null;
  }

  public getTemplate(templateName: string) {
    if (this.template[templateName] === undefined) {
      this.template[templateName] = this.findTemplate(templateName);
    }
    return this.template[templateName];
  }

  ngOnDestroy(): void {
  }

  public disableEdit(rowData) {
    if (rowData.__disableEdit) {
      return true;
    }
    if (this.setting.hiddenEdit) {
      return true;
    }
    return false;
  }

  public disableDelete(rowData) {
    if (rowData.__disableDelete) {
      return true;
    }
    if (this.setting.hiddenDelete) {
      return true;
    }
    return false;
  }

  public buildFilterColumn(cols) {
    const templateFilter = this.templateFilter;
    cols.forEach(col => {
      if (col.controlType == ControlType.dropdown) {
        if (col.service || (col.dataSource && col.dataSource.length > 0)) {
          templateFilter.push(
            new Filter({
              field: this.getFieldFilter(col),
              operator: Operator.in,
              sourceField: col.field
            })
          );
          this.filterSchema.dropdown[col.field] = new DropdownControlSchema({
            ...col,
            appendTo: 'body',
            placeholder: `Chọn ${col.label}`,
            multiple: true,
            loadOnInit: true,
            isServerLoad: col.isServerLoad
          });
        }
        else {
          this.toastWarning(`Chưa cấu hình service hoặc dataSource cho cột ${col.field}: ${col.label}`);
        }
      }
      else {
        if (col.dataType == DataType.int || col.dataType == DataType.decimal) {
          templateFilter.push(
            new Filter({
              field: this.getFieldFilter(col),
              operator: Operator.greaterThanEqual,
              sourceField: col.field,
              subField: 0
            }),
            new Filter({
              field: this.getFieldFilter(col),
              operator: Operator.lowerThanEqual,
              sourceField: col.field,
              subField: 1
            })
          );
        }
        else if (col.dataType == DataType.date || col.dataType == DataType.datetime) {
          templateFilter.push(
            new Filter({
              field: this.getFieldFilter(col),
              operator: Operator.greaterThanEqual,
              sourceField: col.field,
              subField: 0,
              funcGetValue: item => {
                const date = new Date(item);
                return new Date(date.getFullYear(), date.getMonth(), date.getDate());
                // return addDay(item, 1, -1);
              }
            }),
            new Filter({
              field: this.getFieldFilter(col),
              operator: Operator.lowerThanEqual,
              sourceField: col.field,
              subField: 1,
              funcGetValue: item => {
                const date = new Date(item);
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, -1);
              }
            })
          );
        }
        else if (col.dataType == DataType.boolean) {
          templateFilter.push(
            new Filter({
              field: this.getFieldFilter(col),
              operator: Operator.in,
              sourceField: col.field
            })
          );
        }
        else {
          templateFilter.push(
            new Filter({
              field: this.getFieldFilter(col),
              operator: Operator.contain,
              sourceField: col.field
            })
          );
        }
      }
    });
  }

  private getFieldFilter(col) {
    return col.fieldFilter ? col.fieldFilter : col.field;
  }

  public getContextCustomFilter() {
    return {};
  }

  public onSearch = (node?) => {
    if (this.model.loading) return;
    this.handleFilterBoxFocus(node);
    this.filter_column = getFilterFromTemplate(this.templateFilter, this.filterData);
    this.setting.pageSetting.page = 1;
    this.getData();
  };

  public onClearSearch(node, field) {
    if (this.model.loading) return;
    if (this.filterData[field] != null && this.filterData[field] !== '') {
      this.filterData[field] = null;
      this.onSearch(node);
    }
    else {
      this.handleFilterBoxFocus(node);
    }
  }

  public onClearNumberSearch(node, control) {
    if (this.model.loading) return;
    if (control) {
      if (control.clear()) {
        // no need clear data because it's 2 ways binding
        this.onSearch(node);
      }
      else {
        this.handleFilterBoxFocus(node);
      }
    }
  }

  public onClearDateSearch(node, control, field) {
    if (this.model.loading) return;
    if (control) {
      if (control.clear()) {
        // need clear data because not 2 ways binding
        this.filterData[field] = [undefined, undefined];
        this.onSearch(node);
      }
      else {
        this.handleFilterBoxFocus(node);
      }
    }
  }

  public onChangeDateTime(evt, field) {
    this.filterData[field] = evt.value;
    this.onSearch();
  }

  public onChangeBoolean(evt, field) {
    if (this.filterData[field].length == 2) {
      this.filterData[field].splice(0, 1);
    }
    this.onSearch();
  }

  public handleFilterBoxFocus(node) {
    if (node) {
      const activeEl: any = document.activeElement;

      setTimeout(() => {
        const inSameBox = this.checkInNode(activeEl, node);
        if (!inSameBox || (activeEl && activeEl.nodeName != 'INPUT')) {
          const input = node.querySelector('input');
          if (input) input.select();
        }
        else if (inSameBox) {
          activeEl.select();
        }
      });
    }
  }

  onShowFilterDropdownPanel(event) {
    if (!event || !event.component) {
      return;
    }

    const dropdown = event.component.el.nativeElement;
    const cellHeaderFilter = dropdown.closest('th');

    // them class focus-within de dropdown input luc focus khong bi de boi cac sticky column
    cellHeaderFilter && cellHeaderFilter.classList.add('focus-within');
  }

  onHideFilterDropdownPanel(event) {
    if (!event || !event.component) {
      return;
    }

    const dropdown = event.component.el.nativeElement;
    const cellHeaderFilter = dropdown.closest('th');
    cellHeaderFilter && cellHeaderFilter.classList.remove('focus-within');
  }

  public initFilterBoxFocus(node) {
    if (node && node.parentNode) {
      if (node.parentNode.offsetWidth < 250) {
        node.classList.add('short-filter-box');
      }
      else {
        node.classList.remove('short-filter-box');
      }
    }
  }

  private checkInNode(child, parent) {
    let start = child;
    while (start && start.parentNode != parent) {
      start = start.parentNode;
    }

    return start != null;
  }

  public handleTableRendered() {
    const $thFirst = this.table.el.nativeElement.querySelector('thead tr:first-child th:first-child');
    const offsetTop = $thFirst.offsetTop;
    const $ths = this.table.el.nativeElement.querySelectorAll('thead tr:not(:first-child) th');
    for (let i = 0; i < $ths.length; ++i) {
      $ths[i].style.top = `${$ths[i].offsetTop - offsetTop}px`;
    }
    this.onReloaded.emit(true);
  }

  setDropdownDatasource(field, dataSource) {
    if (this.filterSchema.dropdown[field]) {
      this.filterSchema.dropdown[field].dataSource = dataSource;
    }
  }
}
