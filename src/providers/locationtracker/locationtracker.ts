import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { LocalNotifications } from '@ionic-native/local-notifications';

 
@Injectable()
export class LocationtrackerProvider {
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public enteredCampus = false;
  public enteredLuca = false;


 
  constructor(public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              public geolocation : Geolocation,
              public localNotification : LocalNotifications  
  ) {
 
  }
 
  startTracking() {
 
    // Background Tracking
   
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
   
    this.backgroundGeolocation.configure(config).subscribe((location) => {
   
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
   
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
   
    }, (err) => {
   
      console.log(err);
   
    });
   
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
   
   
    // Foreground Tracking
   
  let options = {
    frequency: 1000,
    enableHighAccuracy: true
  };
   
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
   
console.log(options)
    // Run update inside of Angular's zone
    this.zone.run(() => {

      this.lat = Number.parseFloat( Number(position.coords.latitude).toFixed(6));
      this.lng = Number.parseFloat( Number(position.coords.longitude).toFixed(6));
      this.geoFence(this.lat,this.lng);
    });
   
  });
   
  }
 
  stopTracking() {
 
    console.log('stopTracking');
   
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
   
  }
  geoFence(lat:number,long:number){
    console.log('lat' + lat);
    
    console.log('long' + Number(long).toFixed(2));
    console.log('entered o ' + this.enteredCampus)


    if( lat ==  33.978694791829774 && long ==-84.00529641485468 && !this.enteredCampus){
      this.enteredCampus = true
      this.localNoti(lat,long,'enter','campus')
      
      console.log('entered ' + this.enteredCampus)
    }
      else if(lat ==  33.978694791829774 && long ==-84.00529641485468 && this.enteredCampus){
      this.enteredCampus = false
      console.log('exit -- entered ' + this.enteredCampus)
    }
    if((lat>= 33.930400 && lat<=33.930700) && (long >=-83.910700&& long<=-83.910300) && !this.enteredLuca){
      this.enteredLuca = true
      this.localNoti(lat,long,'enter','luca')
      console.log('entered ' + this.enteredLuca)
    }
    else if((lat>= 33.930400 && lat<=33.930700) && (long >=-83.910700&& long<=-83.910300) && this.enteredLuca){
      this.enteredLuca = false
      this.localNoti(lat,long,'exit','luca')
      console.log('exit -- entered ' + this.enteredLuca)
    }
  }
 localNoti(lat:number, lng:number,enterExit:string, place:string){
  this.localNotification.schedule({
    id: 1,
    title: 'You ' + enterExit +' ' +place,
    text: 'lat: '+ lat + 'long: '+ lng
  });
 }
}