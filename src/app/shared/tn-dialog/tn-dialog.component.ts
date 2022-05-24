import { Component, ContentChild, ContentChildren, EventEmitter, HostListener, Injector, Input, OnInit, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { FormBase } from '../base-class/form-base';
import { TnScrollBarComponent } from '../tn-scrollbar/tn-scrollbar.component';
import { Dialog } from 'primeng/dialog';
import { PopupSize } from '../models/schema';

@Component({
  selector: 'tn-dialog',
  templateUrl: './tn-dialog.component.html',
  styleUrls: ['./tn-dialog.component.scss']
})
export class TnDialogComponent implements OnInit {

  @ViewChild('dialog', { static: true }) dialog: Dialog;
  @ViewChild('scrollbar', { static: true }) scrollbar: TnScrollBarComponent;
  _formBase: FormBase;
  @ContentChild('formBase', { static: false }) set formBase(value: FormBase) {
    this._formBase = value;
  }
  get formBase() {
    return this._formBase;
  }
  @ContentChild('footer', { static: true }) footer: TemplateRef<any>;
  @ContentChildren(TemplateRef, { descendants: true }) children: QueryList<TemplateRef<any>>;

  @Input() maskClass: string;
  @Input() styleClass: string;
  @Input() scrollBarStyleClass: string;
  @Input() useDefaultScrollBar: boolean;
  @Input() visible = true;
  @Input() disabledButton = false;
  @Input() modal = true;
  @Input() header: string;
  @Input() popupSize: PopupSize;
  @Input() closeOnEscape = true;
  @Input() showFooter = true;
  @Input() positionTop: number;
  @Input() minY: number;
  @Input() hiddenSave = true;
  @Input() maximizable = true;
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  scrollConfig = { suppressScrollX: true, suppressScrollY: false };
  scrollStyle = {};
  dialogContentDom: any;

  constructor(
    private _injector: Injector
  ) {
  }

  ngOnInit() {
    if (!this.popupSize) this.popupSize = new PopupSize();
    if (this.popupSize.maximize) {
      this.popupSize.width = window.innerWidth;
      this.popupSize.height = window.innerHeight;
    }
    else {
      if (!this.popupSize.width) this.popupSize.width = 800;
      if (!this.popupSize.height) this.popupSize.height = 500;
    }

    this.setupScrollStyle();
  }

  handleShowDialog(event) {
    this.dialogContentDom = this.dialog.wrapper;
    if (this.popupSize.maximize) {
      this.maximize();
    }
    else {
      this.onResize();
    }
    this.onShow.emit(event);
  }

  handleHideDialog(event) {
    this.onHide.emit(event);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.popupSize.width && this.maximizeDialog(this.dialogContentDom, this.popupSize)) {
      if (window.innerWidth < this.popupSize.width) {
        this.popupSize.width = window.innerWidth;
      }
      if (window.innerHeight < this.popupSize.height) {
        this.popupSize.height = window.innerHeight;
      }
      this.setupScrollStyle();
      this.dialog.maximizable = false;
    }
  }

  maximizeDialog(dialogContentDom, popupSize) {
    if (!dialogContentDom || !popupSize) {
      return false;
    }

    if (popupSize.width > window.innerWidth || popupSize.height > window.innerHeight) {
      dialogContentDom.classList.add('full-screen');
      return true;
    }
    // Fix bug trước khi chuyển sang tất cả đều sử dụng tn-dialog
    let width = parseInt(popupSize.width.toString().replace('px', '').replace('%', ''));
    let height = 0;
    if (popupSize.height)
      height = parseInt(popupSize.height.toString().replace('px', '').replace('%', ''))
    if (width > window.innerWidth || height > window.innerHeight) {
      dialogContentDom.classList.add('full-screen');
      return true;
    }
    return false;
  }

  setupScrollStyle() {
    this.scrollStyle = { minHeight: (this.popupSize.height - 106) + 'px' };
  }

  center() {
    this.dialog.center();
  }

  maximize() {
    this.dialog.maximize();
    // Trick for bug primeng
    this.dialog.maximized = true;
  }
}
