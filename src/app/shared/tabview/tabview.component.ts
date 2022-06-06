import { AfterContentInit, Component, ContentChildren, EventEmitter, Injector, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { ComponentBase } from '../base-class/component-base';
import { TabViewData } from '../models/schema';

@Component({
  selector: 'tn-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss']
})
export class TnTabViewComponent extends ComponentBase implements OnInit, AfterContentInit {
  @ContentChildren(TemplateRef) children: QueryList<TemplateRef<any>>;
  _vertical: boolean;
  @Input() set vertical(value: boolean) {
    this._vertical = value;
    this.setStyleClass();
  };
  @Input() data: TabViewData[] = [];
  _hiddenTab: string[] = [];
  hiddenInfo: any = {};
  @Input() set hiddenTab(value: string[]) {
    if (value) {
      this._hiddenTab = value;
    }
    else {
      this._hiddenTab = [];
    }
    if (this.ready) {
      this.setHiddenInfo();
    }
  }
  @Input() allowViewAll = false;
  @Input() set activeIndex(value: number) {
    this.currentTabIndex = value;
  };
  @Input() isDynamicHeight: boolean = false;
  @Output() onTabChange = new EventEmitter<any>();
  @Output() activeIndexChange = new EventEmitter<any>();
  template: { [key: string]: TemplateRef<any> } = {};
  currentTabIndex: number;
  onlyIcon = false;
  styleClass = 'tn-tabview-beauty';
  height = '100%';
  ready = false;
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.isDynamicHeight) {
      this.height = null;
    }
    if (this.currentTabIndex === null || this.currentTabIndex === undefined) {
      let currentTabIndex = this.data.findIndex(q => q.active);
      if (currentTabIndex == -1) {
        currentTabIndex = 0;
      }
      this.currentTabIndex = currentTabIndex;
    }
    this.ready = true;
    this.setHiddenInfo();
  }

  ngAfterContentInit() {
    this.onlyIcon = true;
    this.data.forEach(item => {
      this.template[item.code] = this.findTemplateFromList(this.children, item.code);
      if (item.label) {
        this.onlyIcon = false;
      }
    });
    this.setStyleClass();
  }

  setHiddenInfo() {
    this.hiddenInfo = {};
    this._hiddenTab.forEach(tabCode => {
      this.hiddenInfo[tabCode] = true;
    });
  }

  setStyleClass() {
    let result = 'tn-tabview-beauty';
    if (this._vertical) {
      result += ' vertical';
    }
    if (this.onlyIcon) {
      result += ' only-icon';
    }
    this.styleClass = result;
  }

  handleTabChange(evt) {
    this.currentTabIndex = evt.index;
    this.activeIndexChange.emit(this.currentTabIndex);
    this.onTabChange.emit(evt);
  }
}
