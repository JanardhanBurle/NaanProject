import { Injectable } from '@angular/core';
import { GbLocalStorage } from './localStorage';
import { GbSessionStorage } from './sessionStorage';
import { GbInMemoryStorage } from './inMemoryStorage';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class GbCacheService {

    public static CacheOptions: any = {
        LocalStorage: 'localStorage',
        SessionStorage: 'sessionStorage',
        InMemory: 'inMemory'
    };
    private cacheProvider: string = null;

    constructor(private gbLocalStorage: GbLocalStorage,
        private gbSessionStorage: GbSessionStorage,
        private gbInMemoryStorage: GbInMemoryStorage,
        private configService: ConfigService
    ) {
        this.cacheProvider = this.configService.get('caheProvider');
        console.log('Cache provider enabled with ' + this.cacheProvider);
    }


    /**
    * Return true if the Browser supports the provider
    */
    isSupported(provider: string): boolean {
        let ret: boolean;
        switch (provider) {
            case GbCacheService.CacheOptions.LocalStorage:
                ret = this.gbLocalStorage.isSupported();
                break;
            case GbCacheService.CacheOptions.SessionStorage:
                ret = this.gbSessionStorage.isSupported();
                break;
            default:
                ret = this.gbSessionStorage.isSupported();

        }
        return ret;
    }

    /**
     * Check if provider has an Item / exists with the give key
     * @param key the key of the Item
     */
    has(key: string) {
        let ret: boolean;
        switch (this.cacheProvider) {
            case GbCacheService.CacheOptions.LocalStorage:
                ret = this.gbLocalStorage.has(key);
                break;
            case GbCacheService.CacheOptions.SessionStorage:
                ret = this.gbSessionStorage.has(key);
                break;
            case GbCacheService.CacheOptions.InMemory:
                ret = this.gbInMemoryStorage.has(key);
                break;
            default:
                ret = this.gbSessionStorage.has(key);
        }
        return ret;
    }


    /**
      * Return item from the provider based on the key
      * @param key the key of the Item
      */
    get(key: string): any {
        let ret: any = null;
        switch (this.cacheProvider) {
            case GbCacheService.CacheOptions.LocalStorage:
                ret = this.gbLocalStorage.get(key);
                break;
            case GbCacheService.CacheOptions.SessionStorage:
                ret = this.gbSessionStorage.get(key);
                break;
            case GbCacheService.CacheOptions.InMemory:
                ret = this.gbInMemoryStorage.get(key);
                break;
            default:
                ret = this.gbSessionStorage.get(key);

        }
        return ret;
    }

    /**
     * Set data based on key value pair
     * @param key the key of the Item
     * @param value
     */
    set(key: string, value: any, provider: string = null): boolean {
        let ret;
        if (provider !== null && this.isSupported(provider)) {
            ret = true;
            this._set(key, value, provider);
        } else {
            if (this.isSupported(this.cacheProvider)) {
                ret = true;
                this._set(key, value, this.cacheProvider);
            } else {
                ret = false;
            }
        }
        return ret;
    }

    /**
     * Delete item from the provider based on the key
     * @param key the key of the Item
     * @param Optional - CacheOptions
     */
    remove(key: string, provider: string = null) {
        if (provider == null) {
            this._remove(key, this.cacheProvider);
        } else {
            this._remove(key, provider);
        }
    }


    /**
     * Clear all items from providers
     * @param Optional - CacheOptions
     */
    clear(provider: string = null): void {
        if (provider == null) {
            this.gbLocalStorage.clear();
            this.gbSessionStorage.clear();
            this.gbSessionStorage.clear();
        } else {
            switch (provider) {
                case GbCacheService.CacheOptions.LocalStorage:
                    this.gbLocalStorage.clear();
                    break;
                case GbCacheService.CacheOptions.SessionStorage:
                    this.gbSessionStorage.clear();
                    break;
                default:
                    this.gbSessionStorage.clear();
            }
        }
    }

    private _set(key: string, value: any, provider: string): void {
        switch (provider) {
            case GbCacheService.CacheOptions.LocalStorage:
                this.gbLocalStorage.set(key, value);
                break;
            case GbCacheService.CacheOptions.SessionStorage:
                this.gbSessionStorage.set(key, value);
                break;
            case GbCacheService.CacheOptions.InMemory:
                this.gbInMemoryStorage.set(key, value);
                break;
            default:
                this.gbSessionStorage.set(key, value);
        }
    }

    private _remove(key: string, provider: string): void {
        switch (provider) {
            case GbCacheService.CacheOptions.LocalStorage:
                this.gbLocalStorage.remove(key);
                break;
            case GbCacheService.CacheOptions.SessionStorage:
                this.gbSessionStorage.remove(key);
                break;
            default:
                this.gbSessionStorage.remove(key);
        }
    }

}
