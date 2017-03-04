import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import {
    Geolocation,
    GoogleMap,
    Geocoder,
    GeocoderRequest,
    GeocoderResult,
    GoogleMapsEvent,
    GoogleMapsLatLng,
    GoogleMapsMarker,
    GoogleMapsMarkerOptions,
    Toast
} from 'ionic-native';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    map: GoogleMap;
    latLng: any;
    constructor(public navCtrl: NavController, private platform: Platform) {
        platform.ready().then(() => {
            this.getCurrentPosition();
        });
    }

    getCurrentPosition() {
        Geolocation.getCurrentPosition()
            .then(position => {

                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                this.latLng = new GoogleMapsLatLng(lat, lng)

                this.loadMap();
            });
    }

    loadMap() {
        this.map = new GoogleMap('map', {
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'indoorPicker': true,
                'zoom': true,
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
            'camera': {
                'latLng': this.latLng,
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
            }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.setMarker();
        });
    }

    setMarker() {
        if (this.latLng) {
            let customMarker = "www/assets/custom-marker.png";
            let markerOptions: GoogleMapsMarkerOptions = {
                position: this.latLng,
                title: 'Mi posición',
                icon: customMarker
            };
            let request: GeocoderRequest = {
                position: this.latLng
            };
            this.map.addMarker(markerOptions)
                .then((marker: GoogleMapsMarker) => {
                    Geocoder.geocode(request)
                        .then((results: GeocoderResult) => {
                            var address = [
                                (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
                                results[0].locality].join(", ");
                            console.log("data_: ", address);
                            marker.setTitle(address);
                            marker.showInfoWindow();
                        });
                });
        } else {
            Toast.show("No se ha podido obtener su ubicación", '5000', 'bottom').subscribe(
                toast => {
                    console.log(toast);
                }
            );
        }
    }

}
