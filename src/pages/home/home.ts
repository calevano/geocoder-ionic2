import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder, 
  GeocoderRequest, 
  GeocoderResult,
} from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  myPosition: any = {};
 
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private geocoder: Geocoder,
    private toast: Toast
  ) {}

  ionViewDidLoad(){
    this.getCurrentPosition();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.loadMap();
    })
    .catch(error=>{
      this.toast.show("No se ha podido obtener su ubicación", '5000', 'center')
      .subscribe(toast => console.log(toast) );
    })
  }

  loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 12,
      tilt: 30
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Hello"
      };

      this.addMarker(markerOptions);
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon
    };
    this.map.addMarker(markerOptions)
    .then(marker =>{
      this.doGeocode(marker);
    })
  }

  doGeocode(marker){
    let request: GeocoderRequest = {
      position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
    };
    this.geocoder.geocode(request)
    .then((results: GeocoderResult) => {
      let address = [
        (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
        results[0].locality
      ].join(", ");
      console.log("data_: ", address);
      marker.setTitle(address);
      marker.showInfoWindow();
    });
  }
}
