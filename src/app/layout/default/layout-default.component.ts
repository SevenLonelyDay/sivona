import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout-default',
    templateUrl: './layout-default.component.html',
    styleUrls: ['./layout-default.component.css'],
})
export class LayoutDefaultComponent implements OnInit {
    // 控制菜单是否收缩
    isCollapsed = false;
    constructor() {}

    ngOnInit() {}
}
