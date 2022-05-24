import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, HostListener, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomHandler } from 'primeng/dom';
import { Table } from 'primeng/table';
import { CrudListComponent } from '../crud-list/crud-list.component';

@Directive({
    selector: '[tnReorderableColumn]'
})
export class TnReorderableColumnDirective implements AfterViewInit, OnDestroy {
    @Input() tnReorderableColumnDisabled: boolean;

    dt: Table;

    dragStartListener: any;

    dragOverListener: any;

    dragEnterListener: any;

    dragLeaveListener: any;

    mouseDownListener: any;

    constructor(
        public crudList: CrudListComponent, public el: ElementRef, public zone: NgZone
    ) {
        this.dt = this.crudList.table;
    }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);

            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);

            this.dragOverListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);

            this.dragEnterListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragenter', this.dragEnterListener);

            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }

        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }

        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }

        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }

        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'p-column-resizer')) {
            this.el.nativeElement.draggable = false;
        }
        else {
            this.el.nativeElement.draggable = true;
        }
    }

    onDragStart(event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDragEnter(event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    }

    onDragLeave(event) {
        this.dt.onColumnDragLeave(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    }

    isEnabled() {
        return this.tnReorderableColumnDisabled !== true;
    }

    ngOnDestroy() {
        this.unbindEvents();
    }
}

@Directive({
    selector: '[tnReorderableRow]'
})
export class TnReorderableRowDirective implements AfterViewInit {

    @Input('tnReorderableRow') index: number;

    @Input() tnReorderableRowDisabled: boolean;

    dt: Table;

    mouseDownListener: any;

    dragStartListener: any;

    dragEndListener: any;

    dragOverListener: any;

    dragLeaveListener: any;

    dropListener: any;

    constructor(
        public crudList: CrudListComponent,
        public el: ElementRef,
        public zone: NgZone
    ) {
        this.dt = this.crudList.table;
    }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);

            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);

            this.dragEndListener = this.onDragEnd.bind(this);
            this.el.nativeElement.addEventListener('dragend', this.dragEndListener);

            this.dragOverListener = this.onDragOver.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);

            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }

        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }

        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }

        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }

        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event) {
        if (DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle')) {
            this.el.nativeElement.draggable = true;
        }
        else {
            this.el.nativeElement.draggable = false;
        }
    }

    onDragStart(event) {
        this.dt.onRowDragStart(event, this.index);
    }

    onDragEnd(event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }

    onDragOver(event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    }

    onDragLeave(event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    }

    isEnabled() {
        return this.tnReorderableRowDisabled !== true;
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }

        event.preventDefault();
    }
}

@Directive({
    selector: '[tnSortableColumn]',
    host: {
        '[class.p-sortable-column]': 'isEnabled()',
        '[class.p-highlight]': 'sorted',
        '[attr.tabindex]': 'isEnabled() ? "0" : null',
        '[attr.role]': '"columnheader"',
        '[attr.aria-sort]': 'sortOrder'
    }
})
export class TnSortableColumnDirective implements OnInit, OnDestroy {

    @Input('tnSortableColumn') field: string;

    @Input() tnSortableColumnDisabled: boolean;

    dt: Table

    sorted: boolean;

    sortOrder: string;

    subscription: Subscription;

    subscriptionTableReady: Subscription;

    constructor(public crudList: CrudListComponent) {
        this.subscriptionTableReady = this.crudList.tableReadySource$.subscribe(data => {
            this.dt = this.crudList.table;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
                    this.updateSortState();
                });
                this.updateSortState();
            }
        });
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        if (!this.dt) return;
        this.sorted = this.dt.isSorted(this.field);
        this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled() && !this.isFilterElement(<HTMLElement>event.target)) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });

            DomHandler.clearSelection();
        }
    }

    @HostListener('keydown.enter', ['$event'])
    onEnterKey(event: MouseEvent) {
        this.onClick(event);
    }

    isEnabled() {
        return this.tnSortableColumnDisabled !== true;
    }

    isFilterElement(element: HTMLElement) {
        return DomHandler.hasClass(element, 'pi-filter-icon') || DomHandler.hasClass(element, 'p-column-filter-menu-button');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        if (this.subscriptionTableReady) {
            this.subscriptionTableReady.unsubscribe();
        }
    }

}


@Component({
    selector: 'tn-sortIcon',
    template: `
        <i class="p-sortable-column-icon pi pi-fw" [ngClass]="{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}"></i>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TnSortIcon implements OnInit, OnDestroy {

    @Input() field: string;

    dt: Table

    subscription: Subscription;

    sortOrder: number;

    constructor(public crudList: CrudListComponent, public cd: ChangeDetectorRef) {
        this.dt = crudList.table;
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }

    ngOnInit() {
        this.updateSortState();
    }

    onClick(event) {
        event.preventDefault();
    }

    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            const sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }

        this.cd.markForCheck();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
