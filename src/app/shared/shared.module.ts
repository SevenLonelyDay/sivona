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
