import { Component, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@core/services/win_tokens';
import { Router } from '@angular/router';

@Component({
    selector: 'layout-passport',
    templateUrl: './passport.component.html',
    styles: [
        `
            .container {
                display: flex;
                flex-direction: column;
                min-height: 100%;
            }
            .wrap {
                padding: 32px 0;
                flex: 1;
            }
            .ant-form-item {
                margin-bottom: 24px;
            }
            @media (min-width: 768px) {
                .container {
                    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
                    background-repeat: no-repeat;
                    background-position: center 110px;
                    background-size: 100%;
                }
                .wrap {
                    padding: 112px 0 24px;
                }
            }
            .top {
                text-align: center;
            }
            .header {
                height: 44px;
                line-height: 44px;
            }
            .header a {
                text-decoration: none;
            }
            .logo {
                height: 44px;
                margin-right: 16px;
            }
            .title {
                font-size: 33px;
                color: rgba(0, 0, 0, 0.85);
                font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica,
                    sans-serif;
                font-weight: 600;
                position: relative;
                vertical-align: middle;
            }
            .desc {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
                margin-top: 12px;
                margin-bottom: 40px;
            }
            :host {
                ::ng-deep {
                    .container {
                        display: flex;
                        flex-direction: column;
                        min-height: 100%;
                        background: #f0f2f5;
                    }
                    .wrap {
                        padding: 32px 0;
                        flex: 1;
                    }
                    .ant-form-item {
                        margin-bottom: 24px;
                    }

                    @media (min-width: @screen-md-min) {
                        .container {
                            background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
                            background-repeat: no-repeat;
                            background-position: center 110px;
                            background-size: 100%;
                        }
                        .wrap {
                            padding: 112px 0 24px;
                        }
                    }
                    .top {
                        text-align: center;
                    }
                    .header {
                        height: 44px;
                        line-height: 44px;
                        a {
                            text-decoration: none;
                        }
                    }
                    .logo {
                        height: 44px;
                        margin-right: 16px;
                    }
                    .title {
                        font-size: 33px;
                        color: @heading-color;
                        font-family: 'Myriad Pro', 'Helvetica Neue', Arial,
                            Helvetica, sans-serif;
                        font-weight: 600;
                        position: relative;
                        vertical-align: middle;
                    }
                    .desc {
                        font-size: @font-size-base;
                        color: @text-color-secondary;
                        margin-top: 12px;
                        margin-bottom: 40px;
                    }
                }
            }
        `,
    ],
})
export class LayoutPassportComponent implements OnInit {
    links: GlobalFooterLink[] = [];

    items: any[] = [];

    width: number = 100;
    height: number = 100;
    myStyle: object = {
        'position': 'fixed',
        'width': '100%',
        'height': '100%',
        'z-index': -1,
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
    };
    myParams: object = {
        particles: {
            number: {
                value: 200,
            },
            color: {
                value: '#000'
            },
            shape: {
                type: 'circle',
                // image: {
                //     src:'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg'
                //     src: '/assets/imgs/black147.jpg'
                // }
            },
        }
    };
    constructor(@Inject(WINDOW) private win: Window, private router: Router) { }

    ngOnInit() { }

    to(item: GlobalFooterLink) {
        if (!item.href) {
            return;
        }
        if (item.blankTarget) {
            this.win.open(item.href);
            return;
        }
        if (/^https?:\/\//.test(item.href)) {
            this.win.location.href = item.href;
        } else {
            this.router.navigateByUrl(item.href);
        }
    }
}

interface GlobalFooterLink {
    title: string;
    href: string;
    blankTarget?: boolean;
}
