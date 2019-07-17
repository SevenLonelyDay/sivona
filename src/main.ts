import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// preloader

export function preloaderFinished() {
    const body = document.querySelector('body')!;
    const preloader = document.querySelector('.preloader')!;

    body.style.overflow = 'hidden';

    function remove() {
        // preloader value null when running --hmr
        if (!preloader) return;
        preloader.addEventListener('transitionend', function() {
            preloader.className = 'preloader-hidden';
        });

        preloader.className +=
            'preloader-hidden-add preloader-hidden-add-active';
    }

    (window as any).appBootstrap = () => {
        setTimeout(() => {
            remove();
            body.style.overflow = '';
        }, 100);
    };
}

preloaderFinished();

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(res => {
        if ((<any>window).appBootstrap) {
            (<any>window).appBootstrap();
        }
        return res;
    });
