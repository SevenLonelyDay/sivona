import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { RoutesRoutingModule } from './routes-routing.module';

@NgModule({
    declarations: [],
    imports: [SharedModule, RoutesRoutingModule],
})
export class RoutesModule {}
