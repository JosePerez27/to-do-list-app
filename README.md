# ToDo List App

Guía para instalar la app de ToDo List

# Requisitos previos

Para poder configurar la app en las diferentes plataformas, es necesario instalar los siguientes programas:

- [Android Studio](https://developer.android.com/studio?hl=es-419)
- [XCode](https://developer.apple.com/xcode/)
- [Node 20](https://nodejs.org/en)

# Ionic
Una vez se tengan descargados los programas mencionados, se debe instalar Ionic CLI con el siguiente comando:

- `npm i -g @ionic/cli`

Posteriormente, procedemos a instalar las dependecias del proyecto con el siguiente comando:

- `npm install`

# Agregar plataformas

Para agregar y construir la aplicación en las diferentes plataformas se deben ejecutar los siguientes comandos:

## Android

- `ionic cordova platform rm android`
- `ionic cordova platform add android`

## iOS

- `ionic cordova platform rm ios`
- `ionic cordova platform add ios`


# Compilacion

Para compilar en las diferentes platafornas se deben utilizar los siguientes comandos

## Android

- `ionic cordova build android --prod`

## iOS

- `ionic cordova build ios --prod`

*Nota*: *Si se presenta problebas con la funcionalidad "`xcode-select`" al momento de realizar la compilación en iOS utilizar el siguiente comando*

- `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

Posteriormente a la compilación, se debe abrir el archivo `.xcworkspace` con XCode, ubicado en la siguiente ruta:

- `platforms/ios/ToDo List App.xcworkspace`

Una vez abierto, en XCode se debe seleccionar la carpeta de la aplicación y dar el siguiente comando para construir:

- `ToDo List App`
- `command + b`

# Correr en dispositivos

Para correr en dispositivos físicos o emuladores, se deben ejecutar los siguientes comandos:

## Android

- `ionic cordova run android`

## iOS

- `ionic cordova run ios`
