import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
    NgZorroAntdModule,
    NZ_I18N,
    zh_CN,
    NZ_WAVE_GLOBAL_CONFIG,
} from 'ng-zorro-antd';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(zh);
import { BehaviorSubject } from 'rxjs';

export function ObservableInput<
    T = any,
    SK extends keyof T = any,
    K extends keyof T = any
>(propertyKey?: K | boolean, initialValue?: any) {
    return (target: T, sPropertyKey: SK) => {
        const symbol = Symbol();

        type ST = any;

        type Mixed = T & {
            [symbol]: BehaviorSubject<ST>;
        } & Record<SK, BehaviorSubject<ST>>;

        Object.defineProperty(target, sPropertyKey, {
            enumerable: true,
            configurable: true,
            get(this: Mixed) {
                return (
                    this[symbol] ||
                    (this[symbol] = new BehaviorSubject<ST>(initialValue))
                );
            },
            set(this: Mixed, value: ST) {
                this[sPropertyKey].next(value);
            },
        });

        if (!propertyKey) {
            return;
        }

        if (propertyKey === true) {
            propertyKey = (sPropertyKey as string).replace(/\$+$/, '') as K;
        }

        Object.defineProperty(target, propertyKey, {
            enumerable: true,
            configurable: true,
            get(this: Mixed) {
                return this[sPropertyKey].getValue();
            },
            set(this: Mixed, value: ST) {
                this[sPropertyKey].next(value);
            },
        });
    };
}

@NgModule({
    declarations: [],
    imports: [
        BrowserAnimationsModule,
        NgZorroAntdModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        NgZorroAntdModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        {
            provide: NZ_WAVE_GLOBAL_CONFIG,
            useValue: {
                disabled: true,
            },
        },
    ],
})
export class SharedModule {}
