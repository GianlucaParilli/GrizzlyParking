import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, Platform, AlertController, NavParams, ToastController } from 'ionic-angular';
import {GoogleMaps, GoogleMap, CameraPosition,
        LatLng,GoogleMapsEvent, Marker, MarkerOptions} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { LocationtrackerProvider } from '../../providers/locationtracker/locationtracker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


/*
  Generated class for the hLot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
// FIREBASE ITEM
// H-LOT has 2 lot areas, h1 and h2.
// lotArea: AngularFireList<any>;

@Component({
    selector: 'page-h-Lot',
    templateUrl: 'h-Lot.html'
})
export class HLotPage {
    private latNumber: number;
    private longNumber: number; 
    //let longString;


    @ViewChild('map') mapElement: ElementRef;
    map: GoogleMap;
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                private _googleMaps: GoogleMaps,
                private _geoLocation: Geolocation,
                private _toast: Toast,
                private _toastCtrl: ToastController,
                public _locationService : LocationtrackerProvider,
                public _platform : Platform,
                public _local : LocalNotifications,
                public alertCtrl: AlertController,
                afDatabase: AngularFireDatabase

                ) { 
                    
                    // the list of lotAreas...
                    // this.lotArea = afDatabase.list('/lotArea').valueChanges();
                }
    ngAfterViewInit(){
        this.initMap();
        this.start(); //starts geo location 
       
        this.newMap();
       //this.loadMap();
    
        //get actual location
        this.getLocation().then(res =>{
            //console.log(res.coords.latitude);
        });
    }
   
    initMap(){
        let element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element);
    }
    newMap(){
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            
            let loc: LatLng;
            this.getLocation().then(res =>{
                loc = new LatLng(res.coords.latitude, res.coords.longitude);
                //this.tesss = res.coords.latitude;
                this.latNumber = res.coords.latitude;
                this.longNumber = res.coords.longitude;
                this.moveCamera(loc);
               // this.showMarker();
                this.createMarker(loc,"My Car").then((marker : Marker) =>{
                    marker.showInfoWindow();
                    console.log('print get Location');

                    //console.log('print get Location' + loc);
                   // presentToast("blah " +latString);

                }).catch(err =>{
                    console.log(err);
                })
            }).catch(err =>{
                console.log(err);
            });
        });
    
        //get actual location
        this.getLocation().then(res =>{
            //console.log(res.coords.latitude);
        });
    }
   

    createMarker(loc: LatLng, title: string){
        let markerOptions: MarkerOptions= {
            position:loc, 
            title: title,

        };
        return this.map.addMarker(markerOptions);
    }
    getLocation(){
        let currentLOC = this._geoLocation.getCurrentPosition();
         return currentLOC;
         

    }
    moveCamera(loc: LatLng){
        let options: CameraPosition<LatLng> = {
            target: loc,
            zoom: 18, 
            tilt:10
        }
        this.map.moveCamera(options)
    }
   

    ionViewDidLoad() {
        console.log('ionViewDidLoad hLotPage');
    }

    showToast(tempB : boolean){
        let count= 1;
        this._local.schedule({
            id: 1,
            title: 'Local ILocalNotification Example',
            text: 'entered '+ tempB
          });
        console.log("print pressed button");
       // pinPointLocation();
    }
    showMarker(){
        this.map.clear();
        let newLoc = new LatLng(this._locationService.lat,this._locationService.lng);

        this.createMarker(newLoc,'newMarker Car').then((marker : Marker) =>{
            marker.showInfoWindow();
            console.log('print get Location');

            //console.log('print get Location' + loc);
           // presentToast("blah " +latString);

        }).catch(err =>{
            console.log(err);
        });
        this.moveCamera(newLoc);

        //this._locationService.startTracking();
       //this.presentToast(this._locationService.lat,this._locationService.lng);
       // this.localNotification(this._locationService.lat,this._locationService.lng);
    }
pressButtonTest(){
    this.parkedConfirmation();
    this.showToast(this._locationService.isEnterHLot)
}
    start(){
        this._locationService.startTracking();
      }
     
      stop(){
        this._locationService.stopTracking();
      }
    presentToast(lat: number,long: number) {
        let toast = this._toastCtrl.create({
          message: 'latitude: '+lat +' Longitude: '+ long,
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
         // this.stop;
        });
        toast.present();
      }
localNotification(lat: number,long: number){
  let count= 1;
    this._local.schedule({
        id: 1,
        title: 'Local ILocalNotification Example',
        text: 'lat: '+ lat + 'long: '+ long
      });
}
       

  parkedConfirmation(){ //int googleMapsLocation){
    let TIME_IN_MS = 5000;
    console.log('time out ')

    let carInLot = setTimeout( () => {
         console.log('time out ended ')
         this.showMarker();
    }, TIME_IN_MS);
  }

  updateLot(lot: string, update: number){
    // do a toast... lookup how to do that
    // update db (add or subtract as needed)
    //handler: data => {
    //  this.lotArea.update(lot, XXX
    //});
  }


}
