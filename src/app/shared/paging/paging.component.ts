import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ListData, ListSetting } from '../models/schema';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
  @ViewChild('op', { static: true }) op: OverlayPanel;
  @Input() model: ListData;
  @Input() setting: ListSetting;
  @Input() ngClass: any;
  @Output() onNext = new EventEmitter<any>();
  @Output() onPrev = new EventEmitter<any>();
  @Output() onLatest = new EventEmitter<any>();
  @Output() onRefresh = new EventEmitter<any>();
  @Output() onOldest = new EventEmitter<any>();
  @Output() onChangeLimitPage = new EventEmitter<any>();
  @Output() onChanged = new EventEmitter<any>();

  targetOverlay: ElementRef;
  pageSizeOld: number;

  constructor() {
  }

  ngOnInit() {
    this.pageSizeOld = this.setting.pageSetting.pageSize;
  }

  getFirstIndex() {
    return (this.setting.pageSetting.page - 1) * this.setting.pageSetting.pageSize + 1;
  }

  getLastIndex() {
    let temp = this.setting.pageSetting.page * this.setting.pageSetting.pageSize;
    if (temp > this.model.total) temp = this.model.total;
    return temp;
  }

  goLatest(evt) {
    if (this.isFirst() || this.model.loading) return;
    if (this.setting.pageSetting.pageSize == 0) {
      this.setting.pageSetting.pageSize = 1;
    }
    if (this.setting.pageSetting.pageSize > 1000) {
      this.setting.pageSetting.pageSize = 1000;
    }
    this.setting.pageSetting.page = 1;
    this.op.hide();
    this.onLatest.next(evt);
    this.onChanged.emit();
  }

  goPrev(evt) {
    if (this.isFirst() || this.model.loading) return;
    if (this.setting.pageSetting.page > 1) {
      this.setting.pageSetting.page--;
    }
    this.op.hide();
    this.onPrev.next(evt);
    this.onChanged.emit();
  }

  isFirst() {
    return this.setting.pageSetting.page <= 1;
  }

  goNext(evt) {
    if (this.isLast() || this.model.loading) return;
    this.setting.pageSetting.page++;
    this.op.hide();
    this.onNext.next(evt);
    this.onChanged.emit();
  }

  isLast() {
    return this.model.total <= 0 || this.getLastIndex() == this.model.total;
  }

  goOldest(evt) {
    if (this.isLast() || this.model.loading) return;
    this.setting.pageSetting.page = Math.ceil(this.model.total / this.setting.pageSetting.pageSize);
    this.onOldest.next(evt);
    this.onChanged.emit();
  }

  saveChangeHandle() {
    if (!this.setting.pageSetting.pageSize || this.setting.pageSetting.pageSize.toString() == '0') {
      this.setting.pageSetting.pageSize = this.pageSizeOld;
    }
    this.pageSizeOld = this.setting.pageSetting.pageSize;
    this.goLatest(null);
    this.onChangeLimitPage.next(null);
    this.onChanged.emit();
  }

  handleOverlayShow(evt, targetOverlay) {
  }

  refresh(event) {

  }
}
