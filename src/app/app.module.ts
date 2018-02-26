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
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from '../pages/register/register';
// tabs
import { TabsPage } from '../pages/tabs/tabs';
// OTHER
import { StatusBar } from '@ionic-native/status-bar';
import { ProgressBarModule } from 'angular-progress-bar';
// ANGULAR FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// SETTINGS - ANGULAR FIREBASE
import { credentials } from './config';


// SETTINGS - NG MODULES
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
    HLotPage,
    StatisticsPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    ProgressBarModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
    HLotPage,
    StatisticsPage,
    LoginPage,
    RegisterPage
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