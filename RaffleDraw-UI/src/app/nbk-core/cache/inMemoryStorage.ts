import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GbInMemoryStorage {
    data: any[] = [];
    /**
     * Check if In memory storage has an Item / exists with the give key
     * @param key the key of the Item
     */
    has(key: string): boolean {
        return this.data.find(x => x.key === key);
    }
    /**
     * Return item froM In Memory Storage based on the key
     * @param key the key of the Item
     */
    get(key: string): any {
        if (this.has(key)) {
            return JSON.parse(this.data[key]);
        }
    }
    /**
  * Set data based on key value pair
  * @param key the key of the Item
  * @param value
  */
    set(key: string, value: any): void {
        this.data[key] = JSON.stringify(value);
    }
}
