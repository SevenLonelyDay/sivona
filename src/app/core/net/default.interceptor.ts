import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpHeaders,
  HttpClient
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, catchError } from "rxjs/operators";
import { environment } from "@env/environment";
import { StorageService } from "@core/services/storage.service";

export const TOKENKET = "token";
export const VERSIONKEY = "version";

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector // private nzmodalservice: NzModalService
  ) {}
  // get msg(): NzMessageService {
  //   return this.injector.get(NzMessageService);
  // }
  // private goTo(url: string) {
  //   setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  // }
  private handleData(
    event: HttpResponse<any> | HttpErrorResponse
  ): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    this.injector.get(HttpClient);
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        // 业务层级错误处理，以下假如响应体的 `status` 若不为 `0` 表示业务级异常
        // 并显示 `error_message` 内容
        // const body: any = event instanceof HttpResponse && event.body;
        // if (body && body.status !== 0) {
        //     this.msg.error(body.error_message);
        //     // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //     // this.http.get('/').subscribe() 并不会触发
        //     return ErrorObservable.throw(event);
        // }
        break;
      case 401: // 未登录状态码
        // this.goTo("/passport/login");
        this.injector.get(StorageService).reomveOther();
        break;
      case 403:
      case 404:
        // 404
        console.error("404", event);
        // this.goTo(`/${event.status}`);
        break;
      case 500:
        // var reader = new FileReader()
        // reader.onload = e => console.log(JSON.parse(e.target.result))
        // reader.readAsText(blob)
        if (event instanceof HttpErrorResponse) {
          if (event.error instanceof Blob) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              if (e && e.target && e.target.result) {
                const err = JSON.parse(e.target.result);
                // this.nzmodalservice.error({
                //   nzContent: '<b style="color: red;">' + err.message + "</b>",
                //   nzOkText: "确定",
                //   nzOkType: "danger",
                //   nzOnOk: () => {}
                // });
              }
            };
            reader.readAsText(event.error);
          } else if (event.error.message) {
            // this.nzmodalservice.error({
            //   nzContent:
            //     '<b style="color: red;">' + event.error.message + "</b>",
            //   nzOkText: "确定",
            //   nzOkType: "danger",
            //   nzOnOk: () => {}
            // });
            // this.httpError(event.error.message);
          } else {
            this.httpError(event.error.msg);
          }
        }
        break;
      case 800:
        if (event instanceof HttpErrorResponse) this.httpError(event.error.msg);
        break;
      case 801:
        this.httpError801();
        if (event instanceof HttpErrorResponse) this.httpError(event.error.msg);
        break;
    }
    return of(event);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    // 统一加上服务端前缀
    let url = req.url;
    let header: HttpHeaders = null;
    console.log(url);

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = environment.SERVER_URL + url;
    }
    if (this.injector.get(StorageService).get(TOKENKET)) {
      header = req.headers.set(
        TOKENKET,
        this.injector.get(StorageService).get(TOKENKET)
      );
    } else {
      header = req.headers;
    }
    header = header.set("version", environment.version);
    header = header.set("project", "xmderpweb");
    const newReq = req.clone({
      headers: header,
      url: url
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse && event.status === 200)
          return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }
  private httpError801() {
    this.injector.get(Router).navigate(["/home"]);
  }
  private httpError(message) {
    // this.msg.error(message, { nzDuration: 2 * 1000 });
  }
}
