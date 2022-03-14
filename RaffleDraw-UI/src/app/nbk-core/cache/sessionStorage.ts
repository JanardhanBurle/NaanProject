import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GbSessionStorage {

    /**
    * Return true if the Browser supports sessionStorage
    */
    isSupported(): boolean {
        return typeof (sessionStorage) !== 'undefined';
    }

    /**
     * Check if sessionStorage has an Item / exists with the give key
     * @param key the key of the Item
     */
    has(key: string): boolean {
        return sessionStorage.getItem(key) !== null;
    }

    /**
     * Return item from sessionStorage based on the key
     * @param key the key of the Item
     */
    get(key: string): any {
        return JSON.parse(sessionStorage.getItem(key));
    }

    /**
    * Set data based on key value pair
    * @param key the key of the Item
    * @param value
    */
    set(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /**
    * Delete item from sessionStorage based on the key
    * @param key the key of the Item
    */
    remove(key: string): void {
        sessionStorage.removeItem(key);
    }

    /**
    * Clear all items from sessionStorage
    */
    clear(): void {
        sessionStorage.clear();
    }

}
