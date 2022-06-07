import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBase } from '../base-class/form-base';
import { FormSchema } from '../models/schema';
import { BaseService } from '../services/base.service';

@Component({
    selector: 'table-detail-form',
    templateUrl: './table-detail-form.component.html',
    styleUrls: ['./table-detail-form.component.scss']
})
export class TableDetailFormComponent extends FormBase implements OnInit {

    @Input() schema: FormSchema[] = [];
    @Input() service: BaseService;
    @Input() data: any = {};

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.doNotCheckBaseService = true;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.autoSave = false;
        this.model.data = this.data;
        this.setting.service = this.parentSetting.service;
        this.setting.schema = this.schema;
    }

    override handleManualSave() {
        this.onSaved.emit(this.model.data);
    }
}
