// IMPORTS
// APP
import { MyApp } from './app.component';
// SPLASHSCREEN
import { SplashScreen } from '@ionic-native/splash-screen';
// PAGES
import { HomePage } from '../pages/home/home';
import { HLotPage } from './../pages/h-lot/h-lot';
import { LoginPage } from './../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { DaysurveyPage } from '../pages/daysurvey/daysurvey';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ReportBugsPage } from '../pages/report-bugs/report-bugs';
// tabs
import { TabsPage } from '../pages/tabs/tabs';
// OTHER
import { Toast } from '@ionic-native/toast';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geofence } from '@ionic-native/geofence';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { 
  IonicApp, 
  IonicModule,
  IonicErrorHandler } from 'ionic-angular';
import { LocationtrackerProvider } from '../providers/locationtracker/locationtracker';
import { ProgressBarModule } from 'angular-progress-bar';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ANGULAR FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { credentials } from './config';
import { AuthProvider } from '../providers/auth/auth';


// NG MODULES
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
    SettingsPage,
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