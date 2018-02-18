// IMPORTS
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController } from 'ionic-angular';
import { MyApp } from './app.component';
// SPLASHSCREEN
import { SplashScreen } from '@ionic-native/splash-screen';
// PAGES
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { HLotPage } from './../pages/h-lot/h-lot';
import { StatisticsPage } from './../pages/statistics/statistics';
// tabs
import { TabsPage } from '../pages/tabs/tabs';
// OTHER
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapPage } from '../pages/map/map';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
// ANGULAR FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// SETTINGS - ANGULAR FIREBASE
export const firebaseConfig = {
  apiKey: "AIzaSyCxKh1mXmfd2o76dslPZFzLyJNdY5LPRMo",
  authDomain: "grizzlyparking-1111a.firebaseapp.com",
  databaseURL: "https://grizzlyparking-1111a.firebaseio.com",
  projectId: "grizzlyparking-1111a",
  storageBucket: "grizzlyparking-1111a.appspot.com",
  messagingSenderId: "251820964455"
};

// SETTINGS - NG MODULES
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
    HLotPage,
    StatisticsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
    HLotPage,
    StatisticsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}