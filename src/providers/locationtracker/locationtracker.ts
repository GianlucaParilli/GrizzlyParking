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
  public isEnterHLot = false;
 
  constructor(public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              public geolocation : Geolocation,
              public localNotification : LocalNotifications  
  ) {  }
 
  startTracking() {
    // Background Tracking 
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 0,
      distanceFilter: 0,
      debug: false,
      interval: 1000
    };
   
    this.backgroundGeolocation.configure(config).subscribe((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = Number.parseFloat(location.latitude.toFixed(7));
        this.lng = Number.parseFloat(location.longitude.toFixed(7));
        this.geoFence(this.lat,this.lng);
        this.backgroundGeolocation.finish();
      });
    }, (err) => {  
      console.log(err);
    });
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
    // Foreground Tracking
   
  let options = {
    frequency: 3000,
    enableHighAccuracy: true
  };
   
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => 
  p.code === undefined).subscribe((position: Geoposition) => {
   
console.log(position)
    // Run update inside of Angular's zone
    this.zone.run(() => {

      this.lat =Number.parseFloat(position.coords.latitude.toFixed(7));
      this.lng =Number.parseFloat(position.coords.longitude.toFixed(7));
      //this.geoFence(this.lat,this.lng);
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
    
    console.log('long' + long);
    console.log('entered o ' + this.isEnterHLot)


    if( lat ==  33.978694791829774 && long ==-84.00529641485468 && !this.enteredCampus){
      this.enteredCampus = true
      this.localNoti(lat,long,'enter','campus')
      
      console.log('entered ' + this.enteredCampus)
    }
    else if(lat ==  33.978694791829774 && long ==-84.00529641485468 && this.enteredCampus){
            this.enteredCampus = false
            console.log('exit -- entered ' + this.enteredCampus)
    }


    if((lat>= 33.980500 && lat<=33.980600) && (long <=-84.002100 && long>=-84.002250) && this.isEnterHLot==false){
      this.isEnterHLot = true
      this.localNoti(lat,long,'enter','H lot')
      console.log('entered ' + this.isEnterHLot)
    }
    else if(
            (lat>= 33.980350 && lat<=33.980450) && (long <=-84.001700 && long>=-84.001800) && this.isEnterHLot){
      this.isEnterHLot = false
      this.localNoti(lat,long,'exit','H lot')
      console.log('exit -- entered ' + this.isEnterHLot)
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