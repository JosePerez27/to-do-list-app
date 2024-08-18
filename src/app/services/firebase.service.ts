import { Injectable } from "@angular/core";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getRemoteConfig, getValue, fetchAndActivate, RemoteConfig } from "firebase/remote-config";

import { RemoteConfigType } from "@app/interfaces";
import { environment } from '@environments/environment';
import { DefaultRemoteConfig } from "./firebase-remote-config";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _firebaseApp!: FirebaseApp;
  private _remoteConfig!: RemoteConfig;

  public async initializeApp() {
    this._firebaseApp = initializeApp(environment.firebaseConfig);
    await this.initRemoteConfig();
  }

  public getRemoteConfigValue<T>(name: string, valueType: RemoteConfigType) {
    switch (valueType) {
      case RemoteConfigType.STRING:
        return getValue(this._remoteConfig, name).asString() as T;
      case RemoteConfigType.NUMBER:
        return getValue(this._remoteConfig, name).asNumber() as T;
      case RemoteConfigType.BOOLEAN:
        return getValue(this._remoteConfig, name).asBoolean() as T;
    }
  }

  private async initRemoteConfig() {
    this._remoteConfig = getRemoteConfig(this._firebaseApp);
    this._remoteConfig.settings.minimumFetchIntervalMillis = environment.minimumFetchIntervalMillis;

    this._remoteConfig.defaultConfig = DefaultRemoteConfig;

    await fetchAndActivate(this._remoteConfig);
  }
}
