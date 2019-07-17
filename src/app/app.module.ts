import { CoreModule } from '@core/core.module';
import { RoutesModule } from '@routes/routes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { StorageService } from '@core/services/storage.service';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }),
        HttpClientModule,
        CoreModule,
        SharedModule,
        LayoutModule,
        RoutesModule,
        // HttpClientInMemoryWebApiModule.forRoot(
        //   InMemoryDataService, { dataEncapsulation: false }
        // )
    ],
    declarations: [AppComponent],
    providers: [
        StorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string,
    ) {
        const platform = isPlatformBrowser(platformId)
            ? 'in the browser'
            : 'on the server';
        console.log(`Running ${platform} with appId=${appId}`);
    }
}
