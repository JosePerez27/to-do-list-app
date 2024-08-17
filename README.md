# ToDo List App

Guía para instalar la app de ToDo List

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

*Nota*: *Si se presenta problebas con la funcionalidad "`xcode-select`" al momento de realizar la construcción en iOS utilizar el siguiente comando*

- `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
