import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {Observable} from 'rxjs/Observable';


 
@Injectable()
export class LocationtrackerProvider {
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public enteredCampus = false;
  public enteredLuca = false;
  public isEnterHLot = false;
  public getData: any;
  private getDataObserver: any;

 
  constructor(public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              public geolocation : Geolocation,
              public localNotification : LocalNotifications,
              ) { 
                this.getDataObserver = null;
                this.getData = Observable.create(observer => {
                    this.getDataObserver = observer;
                });
               }
  ngAfterViewInit(){
  }
  
  startTracking() {
    // Background Tracking 
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 0,
      distanceFilter: 0,
      debug: false,
      interval: 1000,
      maximumAge: 0
    };
    this.backgroundGeolocation.configure(config).subscribe((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = Number.parseFloat(location.latitude.toFixed(7));
        this.lng = Number.parseFloat(location.longitude.toFixed(7));
        this.geoFence(this.lat,this.lng);
        //this.hlot.showMarker();
        this.backgroundGeolocation.finish();
      });
    }, (err) => {  
      console.log(err);
    });
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
    // Foreground Tracking
   
  let options = {
    frequency: 500,
    enableHighAccuracy: true,
    maximumAge: 0,

  };
   
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => 
  p.code === undefined).subscribe((position: Geoposition) => {
   
console.log(position)
    // Run update inside of Angular's zone
    this.zone.run(() => {

      this.lat =Number.parseFloat(position.coords.latitude.toFixed(7));
      this.lng =Number.parseFloat(position.coords.longitude.toFixed(7));
      
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

//h lot fence
    if((lat>= 33.9804500 && lat<=33.9806500) && (long <=-84.0020000 && long>=-84.0023000) && this.isEnterHLot==false){
      this.isEnterHLot = true
      this.localNoti2('enter','H lot')
     this.getDataObserver.next(this.isEnterHLot);
      console.log('entered ' + this.isEnterHLot)
    }
    else if( (lat>= 33.980350 && lat<=33.980500) && (long <=-84.001700 && long>=-84.001900) && this.isEnterHLot){
      this.isEnterHLot = false
      this.localNoti2('exit','H lot')
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
 localNoti2( enterExit:string, place:string){
  this.localNotification.schedule({
    id: 1,
    title: 'You ' + enterExit +' ' +place,
    text: 'Drive Safe! '
  });
 }
}