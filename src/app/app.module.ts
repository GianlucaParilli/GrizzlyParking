// IMPORTS
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { 
  IonicApp, 
  IonicModule,
  IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BackgroundMode } from '@ionic-native/background-mode';

// SPLASHSCREEN
// PAGES
import { HomePage } from '../pages/home/home';
import { HLotPage } from './../pages/h-lot/h-lot';
import { LoginPage } from './../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { DaysurveyPage } from '../pages/daysurvey/daysurvey';
// tabs
import { TabsPage } from '../pages/tabs/tabs';
// OTHER
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { LocationtrackerProvider } from '../providers/locationtracker/locationtracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ProgressBarModule } from 'angular-progress-bar';
import { Geofence } from '@ionic-native/geofence';
import { Device } from '@ionic-native/device';
// ANGULAR FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// SETTINGS - ANGULAR FIREBASE
import { credentials } from './config';
import { AuthProvider } from '../providers/auth/auth';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ReportBugsPage } from '../pages/report-bugs/report-bugs';





// SETTINGS - NG MODULES
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    HLotPage,
    SignupPage,
    ResetPasswordPage,
    LoginPage,
    AboutPage,
    DaysurveyPage,
    ReportBugsPage,
    SettingsPage
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
    HLotPage,
    SignupPage,
    ResetPasswordPage,
    LoginPage,
    AboutPage,
    DaysurveyPage,
    ReportBugsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Toast, 
    LocationtrackerProvider,
    BackgroundGeolocation,
    LocalNotifications,
    Geofence,
    Device,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}