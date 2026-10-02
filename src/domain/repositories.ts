export interface Repository { get<T>(key:string,fallback:T):Promise<T>; set<T>(key:string,value:T):Promise<void>; clear():Promise<void> }
export class LocalRepository implements Repository{
 async get<T>(key:string,fallback:T):Promise<T>{try{const raw=localStorage.getItem('t01:'+key);return raw?JSON.parse(raw):fallback}catch{return fallback}}
 async set<T>(key:string,value:T){localStorage.setItem('t01:'+key,JSON.stringify(value))}
 async clear(){Object.keys(localStorage).filter(k=>k.startsWith('t01:')).forEach(k=>localStorage.removeItem(k))}
}
