import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
})
export class SidebarComponent implements OnInit {
    @Input() isCollapsed: any;

    constructor() {}

    ngOnInit() {}
}
