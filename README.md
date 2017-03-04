# geocoder-ionic2
Probando el geocoder de ionic2

Google Maps native in Ionic 2 with geocoder
### 1. Install the the latest version of the Ionic CLI and Cordova:
```sh
$ npm install -g ionic cordova
```

### 2. Clone this repository
```sh
$ git clone https://github.com/calevano/geocoder-ionic2
```

### 3. Navigate to the geocoder-ionic2 directory:
```sh
$ cd geocoder-ionic2
```

### 4. Install the dependencies
```sh
$ npm install

$ ionic state restore
```

### 5. Add Platform Device
```sh
$ ionic platform add android
$ ionic platform add ios
```

### 6. In your console, add KEYS for ANDROID and IOS
```sh
$ ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID=”HERE_YOU_ANDROID_API_KEY” --variable API_KEY_FOR_IOS=”HERE_YOU_IOS_API_KEY”
```
#### you can get one in https://developers.google.com/maps/

### 7. In your console again, add the cordova plugin
```sh
$ ionic plugin add cordova-plugin-geolocation
$ ionic plugin add cordova-plugin-x-toast
```

### 8. Run your project!
```sh
$ ionic build android --prod
$ ionic build ios --prod
$ ionic run android --prod
$ ionic run ios --prod
```

# Yeahhhhhhhhh !!!!!!
