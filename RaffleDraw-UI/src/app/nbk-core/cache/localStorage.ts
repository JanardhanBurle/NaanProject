import { Injectable } from '@angular/core';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class GbLocalStorage {

    /**
    * Return true if the Browser supports localStorage
    */
    isSupported(): boolean {
        try {
            const item = localStorage.getItem('');
            localStorage.removeItem('');
            localStorage.setItem('', item);
            if (item === null) {
                localStorage.removeItem('');
            } else {
                localStorage.setItem('', item);
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Check if localStorage has an Item / exists with the give key
     * @param key the key of the Item
     */
    has(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    /**
     * Return item from local storage based on the key
     * @param key the key of the Item
     */
    get(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
    * Set data based on key value pair
    * @param key the key of the Item
    * @param value
    */
    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
    * Delete item from local storage based on the key
    * @param key the key of the Item
    */
    remove(key: string): void {
        localStorage.removeItem(key);
    }

    /**
    * Clear all items from local storage
    */
    clear(): void {
        localStorage.clear();
    }
}
