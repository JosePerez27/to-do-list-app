import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  public async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  public async get(key: string) {
    const data = await this.storage.get(key);

    return data;
  }

  public async remove(key: string) {
    await this.storage.remove(key);
  }

  public async clear() {
    await this.storage.clear();
  }

  public async getKeys() {
    const keys = await this.storage.keys();

    return keys;
  }
}
