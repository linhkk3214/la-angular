import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'tn-scrollbar',
  templateUrl: './tn-scrollbar.component.html',
  styleUrls: ['./tn-scrollbar.component.scss']
})
export class TnScrollBarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollbar') scrollbar: PerfectScrollbarComponent;
  @ViewChild('defaulScrollbar') defaulScrollbar: ElementRef;

  _style: any = {};
  get style(): any {
    return this._style;
  }
  @Input() set style(value: any) {
    this._style = value;
    if (value && value.parentClass) {
      let html = `<style> .${value.parentClass} perfect-scrollbar>.ps { `;
      if (value.minHeight) {
        html = `${html}min-height: ${value.minHeight}; `;
      }
      if (value.maxHeight) {
        html = `${html}max-height: ${value.maxHeight}; `;
      }
      html = `${html}} </style>`;
      this._styleText = this.sanitizer.bypassSecurityTrustHtml(html);
    }
  }
  @Input() useDefaultScrollBar = false;
  @Input() autoMode = true;
  @Input() class: any;
  _config: any = { suppressScrollX: true, suppressScrollY: false };
  _styleText: any = {};
  @Input() set config(value: any) {
    this._config = value;
    this.adjustConfig();
  }
  @Input() whiteBackGround: boolean = false;
  _showScrollHorizontal: boolean = false;
  @Input() set showScrollHorizontal(value: boolean) {
    this._showScrollHorizontal = value;
    this.adjustConfig();
  };

  @Output() scrollY = new EventEmitter<any>();
  @Output() scrollUp = new EventEmitter<any>();
  @Output() scrollDown = new EventEmitter<any>();
  @Output() scrollLeft = new EventEmitter<any>();
  @Output() scrollRight = new EventEmitter<any>();
  @Output() scrollYReachEnd = new EventEmitter<any>();
  @Output() scrollYReachStart = new EventEmitter<any>();
  @Output() scrollXReachEnd = new EventEmitter<any>();
  @Output() scrollXReachStart = new EventEmitter<any>();

  public elementRef: any;
  private _intervalTime = 100;
  private _checkScrollBar = true;

  constructor(
    elm: ElementRef,
    private sanitizer: DomSanitizer
  ) {
    this.elementRef = elm.nativeElement;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const divs = this.elementRef.getElementsByClassName('ps-content');
    if (divs && divs.length > 0) {
      const contentDiv = divs[0];
      const scrollYHolder = this.findNext(contentDiv, 'ps__rail-y');
      if (scrollYHolder) {
        const scrollYs = scrollYHolder.getElementsByClassName('ps__thumb-y');
        if (scrollYs && scrollYs.length > 0) {
          setTimeout(() => {
            this.checkScrollBar(contentDiv, scrollYs[0]);
          }, this._intervalTime);
        }
      }
    }
  }

  findNext(curentNode, className) {
    let nextSibling = curentNode.nextSibling;
    while (nextSibling) {
      if (nextSibling.classList && nextSibling.classList.contains(className)) {
        return nextSibling;
      }
      nextSibling = nextSibling.nextSibling;
    }
    return null;
  }

  checkScrollBar(contentDiv: any, scrollY: any) {
    try {
      const contentHeight = contentDiv.clientHeight;
      const holderHeight = contentDiv.parentElement.clientHeight;
      if (holderHeight > 0) {
        if (holderHeight >= contentHeight) {
          scrollY.style.display = 'none';
        }
        else {
          scrollY.style.display = '';
        }
      }

      if (this._checkScrollBar) {
        setTimeout(() => {
          this.checkScrollBar(contentDiv, scrollY);
        }, this._intervalTime);
      }
    }
    catch { }
  }

  adjustConfig() {
    if (!this._config) {
      this._config = { suppressScrollX: true, suppressScrollY: false };
    }
    if (this._showScrollHorizontal) {
      if (!this._config) {
        this._config = { suppressScrollX: false };
      }
      else {
        this._config.suppressScrollX = false;
      }
    }
  }

  public scrollToTop(offset = 0, time = 0) {
    if (this.defaulScrollbar) {
      this.oldScrollTop = this.defaulScrollbar.nativeElement.scrollTop;
      if (time > 20) {
        this.scrollTo(this.defaulScrollbar.nativeElement, offset, time);
      }
      else {
        this.defaulScrollbar.nativeElement.scrollTop = offset;
      }
      this.onDefaultScrollY(null);
    }
    else {
      this.scrollbar.directiveRef.scrollToTop(offset, time);
    }
  }

  public scrollToBottom(offset = 0, time = 0) {
    if (this.defaulScrollbar) {
      this.oldScrollTop = this.defaulScrollbar.nativeElement.scrollTop;
      if (time > 20) {
        this.scrollTo(this.defaulScrollbar.nativeElement, this.defaulScrollbar.nativeElement.scrollHeight - this.defaulScrollbar.nativeElement.clientHeight - offset, time);
      }
      else {
        this.defaulScrollbar.nativeElement.scrollTop = this.defaulScrollbar.nativeElement.scrollHeight - this.defaulScrollbar.nativeElement.clientHeight - offset;
      }
      this.onDefaultScrollY(null);
    }
    else {
      this.scrollbar.directiveRef.scrollToBottom(offset, time);
    }
  }
  onScrollY(event) {
    this.scrollY.emit({ $event: event });
  }

  onScrollUp(event) {
    this.scrollUp.emit({ $event: event });
  }

  onScrollDown(event) {
    this.scrollDown.emit({ $event: event });
  }

  onScrollLeft(event) {
    this.scrollLeft.emit({ $event: event });
  }

  onScrollRight(event) {
    this.scrollRight.emit({ $event: event });
  }

  onScrollYReachStart(event) {
    this.scrollYReachStart.emit({ $event: event });
  }

  onScrollYReachEnd(event) {
    this.scrollYReachEnd.emit({ $event: event });
  }

  onScrollXReachStart(event) {
    this.scrollXReachStart.emit({ $event: event });
  }

  onScrollXReachEnd(event) {
    this.scrollXReachEnd.emit({ $event: event });
  }

  oldScrollTop = 0;
  onDefaultScrollY(event) {
    const newScrollTop = this.defaulScrollbar.nativeElement.scrollTop;
    if (this.oldScrollTop != newScrollTop) {
      this.scrollY.emit({ $event: event });
    }
    if (newScrollTop > this.oldScrollTop) {
      this.scrollDown.emit({ $event: event });
    }
    else if (newScrollTop < this.oldScrollTop) {
      this.scrollUp.emit({ $event: event });
    }
    if (newScrollTop >= (this.defaulScrollbar.nativeElement.scrollHeight - this.defaulScrollbar.nativeElement.clientHeight)) {
      this.scrollYReachEnd.emit({ $event: event });
    }
    if (newScrollTop <= 0) {
      this.scrollYReachStart.emit({ $event: event });
    }

    this.oldScrollTop = newScrollTop;
  }

  scrollTo(element, to, duration) {
    const start = element.scrollTop,
      change = to - start,
      increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  scrollToRight(lengthInPx: number) {
    this.scrollbar.directiveRef.scrollToRight(lengthInPx);
  }

  scrollFromLeft(lengthInPx: number) {
    this.scrollbar.directiveRef.scrollToLeft(lengthInPx);
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  update() {
    this.scrollbar.directiveRef.update();
  }

  ngOnDestroy(): void {
    this._checkScrollBar = false;
  }
}

