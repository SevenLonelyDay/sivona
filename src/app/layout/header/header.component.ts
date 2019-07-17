import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styles: [
        `
            .trigger {
                font-size: 18px;
                line-height: 64px;
                padding: 0 24px;
                cursor: pointer;
                transition: color 0.3s;
            }

            .trigger:hover {
                color: #1890ff;
            }
        `,
    ],
})
export class HeaderComponent implements OnInit {
    // @Input() isCollapsed: Boolean;

    _isCollapsed: boolean;

    @Output() isCollapsedChange = new EventEmitter();

    @Input()
    get isCollapsed(): boolean {
        return this._isCollapsed;
    }
    set isCollapsed(val) {
        this._isCollapsed = val;
        this.isCollapsedChange.emit(this._isCollapsed);
    }

    constructor() {}

    ngOnInit() {}
}
