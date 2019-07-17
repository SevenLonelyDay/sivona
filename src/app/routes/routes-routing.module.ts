import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from '../layout/default/layout-default.component';
import { environment } from '@env/environment';
import { LayoutPassportComponent } from '../layout/passport/passport.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        children: [],
    },
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule],
})
export class RoutesRoutingModule {}
