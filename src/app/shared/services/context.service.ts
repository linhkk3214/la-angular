import { Injectable } from "@angular/core";
import { Subject, takeUntil } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class ContextService {
    subjects: {
        [name: string]: Subject<any>
    } = {};
    _unSubscribeAll = new Subject<any>();
    constructor(
    ) {

    }

    private getSubject(name: string) {
        if (!this.subjects[name]) {
            this.subjects[name] = new Subject<any>();
        }
        return this.subjects[name];
    }

    fireEvent(name: string, data: any) {
        const subject = this.getSubject(name);
        subject.next(data);
    }

    subscribe(name: string, callBack: any) {
        return this.getSubject(name)
            .pipe(takeUntil(this._unSubscribeAll))
            .subscribe((rs) => {
                try {
                    callBack(rs);
                }
                catch { };
            });
    }

    private completeSubject(name: string) {
        if (this.subjects[name]) {
            this.subjects[name].complete();
            delete this.subjects[name];
        }
    }

    destroyContext() {
        for (const key in this.subjects) {
            this.completeSubject(key);
        }

        this._unSubscribeAll.next(true);
        this._unSubscribeAll.complete();
    }
}
