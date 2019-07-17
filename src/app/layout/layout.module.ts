import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutDefaultComponent } from './default/layout-default.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutPassportComponent } from './passport/passport.component';

const COMPONENTS = [LayoutDefaultComponent, HeaderComponent, SidebarComponent];

@NgModule({
    declarations: [...COMPONENTS, LayoutPassportComponent],
    exports: [...COMPONENTS],
    imports: [SharedModule],
})
export class LayoutModule {}
