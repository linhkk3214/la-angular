import { CommonModule, DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeVi from '@angular/common/locales/vi';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AfterViewCheckedComponent } from './after-view-checked/after-view-checked.component';
import { CrudFormComponent } from './crud-form/crud-form.component';
import { CrudListComponent } from './crud-list/crud-list.component';
import { DateTimePickerComponent } from './datetime-picker/datetime-picker.component';
import { TnReorderableColumnDirective, TnReorderableRowDirective, TnSortableColumnDirective, TnSortIcon } from './directive/primeng.directive';
import { TnDatePipe } from './directive/tn-date.directive';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaskComponent } from './mask/mask.component';
import { NumberPickerRangeComponent } from './number-picker-range/number-picker-range.component';
import { PagingComponent } from './paging/paging.component';
import { TableDetailFormComponent } from './table-detail-form/table-detail-form.component';
import { TnTabViewComponent } from './tabview/tabview.component';
import { DatetimePickerRangeComponent } from './tn-datetime-picker-range/tn-datetime-picker-range.component';
import { TnDialogComponent } from './tn-dialog/tn-dialog.component';
import { TnScrollBarComponent } from './tn-scrollbar/tn-scrollbar.component';

registerLocaleData(localeVi);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false,
  suppressScrollY: false
};

const declarations: any = [
  CrudListComponent,
  CrudFormComponent,
  DateTimePickerComponent,
  DropdownComponent,
  FileUploadComponent,
  MaskComponent,
  TnScrollBarComponent,
  AfterViewCheckedComponent,
  NumberPickerRangeComponent,
  DatetimePickerRangeComponent,
  PagingComponent,
  TnDialogComponent,
  TnTabViewComponent,
  TableDetailFormComponent,

  TnDatePipe,

  TnReorderableColumnDirective,
  TnReorderableRowDirective,
  TnSortableColumnDirective,
  TnSortIcon
];

@NgModule({
  declarations: [
    ...declarations
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule,
    FileUploadModule,
    DropdownModule,
    CheckboxModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    ToastModule,
    TableModule,
    TooltipModule,
    PerfectScrollbarModule,
    AutoCompleteModule,
    SplitButtonModule,
    SelectButtonModule,
    ButtonModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    DialogModule,
    TabViewModule,
    ContextMenuModule,
    RadioButtonModule
  ],
  exports: [
    ...declarations,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    CheckboxModule,
    TabViewModule,
    AutoCompleteModule,
    RadioButtonModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
    DatePipe,
    DecimalPipe
  ],
  bootstrap: []
})
export class SharedModule { }
