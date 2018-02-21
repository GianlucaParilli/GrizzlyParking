// IMPORTS
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController } from 'ionic-angular';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
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
import { ProgressBarModule } from 'angular-progress-bar';

// ANGULAR FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// SETTINGS - ANGULAR FIREBASE
export const firebaseConfig = {
  apiKey: "AIzaSyBMri8zJn3iCZDD5iwklvwatW9nQlM0BnI",
  authDomain: "grizzlyparking-2222a.firebaseapp.com",
  databaseURL: "https://grizzlyparking-2222a.firebaseio.com",
  projectId: "grizzlyparking-2222a",
  storageBucket: "",
  messagingSenderId: "375005973853"
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
    ProgressBarModule,
    IonicModule.forRoot(MyApp)
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