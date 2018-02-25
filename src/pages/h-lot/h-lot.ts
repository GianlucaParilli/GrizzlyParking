import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GoogleMaps, GoogleMap, CameraPosition,
        LatLng,GoogleMapsEvent, Marker, MarkerOptions} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { LocationtrackerProvider } from '../../providers/locationtracker/locationtracker';



/*
  Generated class for the hLot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
                public _locationService : LocationtrackerProvider
                ) { 
                }
    ngAfterViewInit(){
        this.initMap();
        let loc: LatLng;
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.getLocation().then(res =>{
                loc = new LatLng(res.coords.latitude, res.coords.longitude);
                //this.tesss = res.coords.latitude;
                this.latNumber = res.coords.latitude;
                this.longNumber = res.coords.longitude;
                this.moveCamera(loc);
                this.showMarker();
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
   
    initMap(){
        let element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element);
    }

    createMarker(loc: LatLng, title: string){
        let markerOptions: MarkerOptions= {
            position:loc, 
            title: title
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
            zoom: 15, 
            tilt:10
        }
        this.map.moveCamera(options)
    }
   

    ionViewDidLoad() {
        console.log('ionViewDidLoad hLotPage');
    }

    showToast(){
        console.log("print pressed button");
       // pinPointLocation();
    }
    showMarker(){
        this.start();
        //this._locationService.startTracking();
       this.presentToast(this._locationService.lat,this._locationService.lng);
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

}
