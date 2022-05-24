import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, Input, OnDestroy, Output } from '@angular/core';
import { ComponentBase } from '../base-class/component-base';

@Component({
  selector: 'after-view-checked',
  templateUrl: './after-view-checked.component.html',
  styleUrls: ['./after-view-checked.component.scss']
})
export class AfterViewCheckedComponent extends ComponentBase implements AfterViewInit, OnDestroy {
  _renderKey: any;
  _prevRenderKey: any;
  get renderKey(): any {
    return this._renderKey;
  }
  @Input() set renderKey(value: any) {
    this._prevRenderKey = this._renderKey;
    this._renderKey = value;
    if (this._prevRenderKey != this._renderKey) {
      this.reRender.next(true);
    }
  }
  @Output() loaded = new EventEmitter<any>();
  @Output() loading = new EventEmitter<any>();
  @Output() unloading = new EventEmitter<any>();
  @Output() reRender = new EventEmitter<any>();

  element: HTMLElement;

  constructor(
    injector: Injector,
    ref: ElementRef
  ) {
    super(injector);
    this.element = ref.nativeElement;
  }

  ngAfterViewInit(): void {
    this.loading.next(true);
    setTimeout(() => {
      this.loaded.next(this.element);
    });
  }

  ngOnDestroy(): void {
    this.unloading.next(true);
  }
}
