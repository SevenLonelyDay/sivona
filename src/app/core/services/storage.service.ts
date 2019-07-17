import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

@Injectable()
export class StorageService {
  storage: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = window.localStorage;
    }
    if (isPlatformServer(this.platformId)) {
      this.storage = {};
    }
  }

  /**
   * 存储字符串
   * @param key 存储键
   * @param value 存储值
   */
  set(key: string, value: string) {
    this.storage[key] = value;
  }

  /**
   * 获取存储的字符串
   * @param key 读取存储键
   */
  get(key: string): string {
    return this.storage[key];
  }

  /** 存储对象 */
  setObject(key: string, value: object) {
    this.storage[key] = JSON.stringify(value);
  }

  /**
   * 获取存储对象
   * @param key 获取对象的键
   */
  getObject(key: string): any {
    if (this.storage[key]) {
      return JSON.parse(this.storage[key]);
    } else {
      return null;
    }
  }

  /**
   * 删除单个存储
   * @param key 删除键
   */
  remove(key: string) {
    this.storage.removeItem(key);
  }

  /**
   * 删除预留的nav信息
   */
  removeNav() {
    for (const key in this.storage) {
      if (key.substring(0, 3) === "nav") {
        this.storage.removeItem(key);
      }
    }
  }

  /**
   * 清除所有localStorage的值
   */
  clear() {
    this.storage.clear();
  }

  /**
   * 清除所有没有permanent前缀的字符串值
   */
  reomveOther() {
    for (const key in this.storage) {
      if (key.substring(0, 9) !== "permanent") {
        this.storage.removeItem(key);
      }
    }
  }
}
