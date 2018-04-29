# Grizzly Parking

Grizzly Parking is a _hybrid mobile application_, powered by [Ionic Framework](https://ionicframework.com/), that helps with parking. Originally, our team's idea was to ease the flow of traffic on Georgia Gwinnett College's (GGC) campus and help students find available parking during school hours. Currently, it is specific to the GGC H-Lot parkinglot. It is designed to scale up, grow, and work for other parkinglots not on GGC's campus!


## Major Tools Used
* Database - [Google Firebase](https://firebase.google.com/)
  * [Cloud Firestore](https://firebase.google.com/products/firestore/) - NoSQL database built for global apps
    * Used to store static, dynamic, and aggregate data for parkinglots, users, and survey data relevant to parking congestion and app bugs.
    * We were led onto Firebase after watching some dated, but still somewhat relevant ***Lynda.com*** videos
* Authentication - Google Firebase
  * [Firebase Authentication](https://firebase.google.com/products/auth/) - Easy sign-in with any platform
    * Used to register and verify users on our app
    * Currently, only setup for @ggc.edu domain users
    * App is designed to easily adapt to other domains
* Location and related services - Ionic-Native plugins from Cordova
  * [GeoLocation](https://ionicframework.com/docs/native/geolocation/) - Provides information about the device's location, such as latitude and longitude
    * Used to determine user location
  * [GeoFence](https://ionicframework.com/docs/native/geofence/) - Monitors circular geofences around latitude/longitude coordinates
    * Used to determine the user's proximity to parkinglots and whether they are parking or leaving the parkinglot


## Quick Start

### Team Composition
_Make sure the team composition is right_
* DEVICE COVERAGE - Teams should require members to each have either an Android or Apple device. At least one of each device type per group!
  * [Android](https://cordova.apache.org/docs/en/7.x/guide/platforms/android/)
  * [Apple](https://cordova.apache.org/docs/en/2.5.0/guide/getting-started/ios/) - A MacOS device is **required** to test this app on an Apple device
* PROJECT MANAGEMENT - Use a Project Management Tool to help keep track of progress.
  * We used [trello.com](https://trello.com/)
### Become Familiar with Ionic, Angular, and Firebase

Ionic Videos | Angular Videos
------------ | --------------
[Ionic Mobile Weather App](https://youtu.be/qs2n_poLarc) | [Angular Firebase - Authorization + Custom User](https://www.youtube.com/watch?v=e8GA1UOj8mE)
[Ionic + Firebase + Cloud Vision](https://www.youtube.com/watch?v=taPczl94Eow) | [Angular 4 Tutorial](https://www.youtube.com/watch?v=KhzGSHNhnbI)
[Ionic Native + Firebase](https://www.youtube.com/watch?v=SOOjamH1bAA) | [Angular 4 Tutorial for Beginners](https://www.youtube.com/watch?v=k5E2AVpwsko)
[Ionic + Firebase CRUD + Observable Subscriptions](https://www.youtube.com/watch?v=pQSn3iNZuTQ) | [Angular Firebase - Testing](https://www.youtube.com/watch?v=BumgayeUC08)

#### [IONIC](https://ionicframework.com/docs/)
* ABOUT - Ionic is a complete open-source SDK for hybrid mobile app development. The original version was released in 2013 and built on top of AngularJS and Apache Cordova. Ionic provides tools and services for developing hybrid mobile apps using Web technologies like CSS, HTML5, and Sass.
* FEATURES
  * The latest and greatest Ionic is still a ***javascript*** app, supporting ***Typescript*** for some major benefits described below. ***Angular*** is the underlying framework (yes, another one!) that powers Ionic's front end
  * _AoT Compiling_ - Ahead-of-Time compiling, powered by TypeScript, unlike traditional web applications
  * _Lazy Loading_ - A new way for Ionic to only load the neccessary .ts files when needed
  * _Live Reload_ - starts when you run ```ionic serve```. Updates _instantly_ when changes are made to development files
  * [_Components_](https://ionicframework.com/docs/components/) - Components in Ionic are reusable UI elements
  * [_Ionicons_](https://ionicframework.com/docs/ionicons/)
  * [_Ionic Native_](https://ionicframework.com/docs/native/) - a TypeScript wrapper, taking advantage of the Cordova framework plugins

#### [ANGULAR](https://angular.io/docs)
* _Observables & RxJS_ - provide support for passing messages between publishers and subscribers in your application. Become familiar with asyncronous objects.
* _BootStrapping_ - the root component that Angular creates and inserts into the index.html host web page
* _NgModules_ - takes a metadata object that describes how to compile a component's template and how to create an injector at runtime.
* _Dependency Injection_
* _Testing_

#### [FIREBASE](https://firebase.google.com/docs/firestore/quickstart)
* Google's BaaS (Backend-as-a-Service). All the tools described below are available through your Firebase console. Handles:
  * [***Authentication***](https://firebase.google.com/docs/auth/web/password-auth) - checkout the video above!
  * [***Database***](https://firebase.google.com/docs/firestore/) - Firestore (beta at the time we created this app)
  * [***File Storage***](https://firebase.google.com/docs/firestore/) - used for basic storage as well as cloud functions!
  * [***Cloud Functions***](https://firebase.google.com/docs/functions/) - 
  * Firebase Console - Google's Firebase Console is a hub to see everything above, and anything else your app needs to run correctly, such as security. You'll see _'GO TO CONSOLE'_ or _'LOGIN'_ in the top right corner of the docs site.
* [***AngularFire2***](https://github.com/angular/angularfire2/blob/master/docs/ionic/v3.md) - We used this (npm package) to enable the app to communicate with the _Firebase SDK_ for web applications (NOT iOS or Android)

### Text Editor - Recommend [Visual Studio Code](https://code.visualstudio.com/Download)
* VS Code offers support for Ionic with third-party extensions
* Ease of use, opens the entire project directories, UI customization... it's basically a really lite IDE, but it's actually an amazingly rich text editor
* Integrated Terminal ```ctrl + ` ```
    1. Git
    2. Ionic CLI

## Setup and Install
1. NodeJS - [download](https://nodejs.org/en/) and install
2. [Android Tools](https://cordova.apache.org/docs/en/7.x/guide/platforms/android/) and [iOS Tools](https://cordova.apache.org/docs/en/7.x/guide/platforms/ios/) - checkout what is required to work with your available device
3. Ionic
   1. Install - run command ```npm install -g ionic```
      * If you get an error, run ```npm``` by itself to check the install finished correctly
      * You may need to run ```npm install npm@latest -g``` to install the newest npm update
   2. Create a New App - run command ```ionic start <your app name> tabs```
      * NOTE: We used the _tabs_ template, but there is also _blank_ and _sidemanu_ to date
   3. Run your New App - run commands ```cd <your app name>``` and ```ionic serve```
4. Firebase
   1. Install - run command ```npm install firebase --save```
   1. Create a Firebase project in the [Firebase console](https://console.firebase.google.com/)
   2. Choose ***Add Firebase to your web app*** to view your customized code snippet you will need for your project
      * We advise watching one of the videos above on getting started with Firebase, in order to determine a safe place for your code snippet. It will look like the sample below:
        ```ts
        // Initialize Firebase
        // TODO: Replace with your project's customized code snippet
        var config = {
        apiKey: "<API_KEY>",
        authDomain: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        storageBucket: "<BUCKET>.appspot.com",
        };
        firebase.initializeApp(config);
        ```
      * We exported/imported into the ```app.component.ts``` from a file that is .gitignore for security
      * Add ```import * as firebase from "firebase";``` to ```app.component.ts``` as well 
   3. We recommend setting up Cloud Functions. Instructions to get started are in your Firebase console menu. You are good to go without this step.
## Code Base Explanation
### Adding a new page
1. Use Ionic's CLI to generate new pages
    ```sh
    ionic -g page <your page name>
    ```
2. Since Ionic 3 uses **'Lazy Loading'**, it creates a new folder for your page with it's own ```module.ts``` named after your page ```<your page name>.ts```
3. In order for the application to recognize the new page, you must import and inject the exported class from your newly generated page into the ```app.module.ts```. Import at the top, then inject under ```DEPENDENCIES``` and ```ENTRY COMPONENTS```

### Page Navigation
1. Ionic uses a **STACK** as a data structure for the **UI**
2. ```Pushing``` a new page will place it on top of the current page; meaning that pressing back will go back to the previous page by ```popping``` current page.
    ```ts
    this.navCtrl.push(YourPageClass);
    ```

### Using TypeScript variables within the HTML files
1. You can escape HTML and insert TypeScript code by using: 
    ```html
    {{ yourTypeScriptVariableHere }}

    <a href="#">{{ typeScriptVariable }}</a>
    ```

### How Firebase connects with the app
1. Keep your Firebase credentials in a safe place... as described in the **Setup and Install** section. These are required to be imported or hard coded into your ```app.component.ts```
2. ```src/app/app.module.ts``` holds the code that initializes Firebase
    ```ts
    imports: [
        AngularFireModule.initializeApp(credentials.firebase),
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,
        AngularFireDatabaseModule]
    ```
### Firebase Authentication
1. Import correct dependencies at the top of the TypeScript file <br>
    ```ts
    import { AuthProvider } from '../../providers/auth/auth';
    import { AngularFireAuth } from 'angularfire2/auth';
    ```
2. Make sure you have injected a parameter within the constructor of the TypeScript file you are working on so that you can use Firebase
    ```ts
    constructor(public afAuth : AngularFireAuth){ 
        this.variable = this.afAuth.getID }
    ```

//Todo

## Firebase Firestore Database
Google's Firebase firestore is a flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development. It keeps your data in sync across client apps through realtime listeners and offers offline support for mobile and web so you can build responsive apps that work regardless of network latency or Internet connectivity.

### Database Structure
A NoSQL database does not have a strict structure like a typical SQL relational database. Instead, it is a somewhat loosely structured system. A system where we have collections and documents. Think if these as being like a todo list or maybe files for your filing cabinet at home.  

| Structure | Example |  
| --------------------- | ----------------- |  
| ***Cloud Firestore*** | :cloud: Firestore |  
| ***Database*** | &nbsp; &nbsp; :books: Database |  
| ***Collections*** | &nbsp; &nbsp; &nbsp; &nbsp; :notebook: parkingLot |  
| ***Documents*** | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :page_facing_up: other parkinglot...<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :page_facing_up: other parkinglot...<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :page_facing_up: h-Lot |  
| ***DocumentData*** | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  :small_orange_diamond: `<name>`: `<data type>` = `<value>`<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :ticket: `<name>`: `<firestore reference>` = `<value>`<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :small_orange_diamond: title: string = "H Lot"<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :small_orange_diamond: picture: string = "hLot.png"<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :ticket: centerLocation: reference = /location/hLotCenter<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :small_orange_diamond: percentFull: number = 0<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :small_orange_diamond: capacity: number = 167<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :small_orange_diamond: population: number = 0<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :small_orange_diamond: status: string = "secondary" |  
| ***Collections*** | &nbsp; &nbsp; &nbsp; &nbsp; :notebook: location |  

### AGGREGATE DATA and UPDATING DATA
Notice how the ```parkingLot Collection``` has an ```h-Lot Document``` with aggregate ```DocumentData percentFull```. ```DocumentData status``` is also aggregate. In order to take full advantage of the asyncronous nature of firestore, this data is kept as DocumentData instead of calculated on the user-end through the use of a query
* EX: a typical Oracle SQL query determining aggregate data for results
  ```SQL
  SELECT (population / NVL(capacity, 1)) * 100 AS "percentFull"
  FROM parkingLot
  WHERE parkingLot_id = 'h-Lot';
  ```
* Instead we update the DocumentData for percentFull the same time a user updates there status as being parked in a particular parkinglot. Let's say a user parks in the h-Lot. We made a function that updataes all the data, which in turn updates all devices that are linked asyncronously to this firestore database via our app!
<br> EX: a function called when a user parks to update the ```Document h-Lot``` ```DocumentData <multiple>```
  ```js
  // A simple sample based on how we used the app and examples above 
  updateParkingLotDocData(change: number) {
      console.log("FUNCTION updateParkingLotDocData called");
      
      // this.afs : AngularFirestore object, made in our ionic page's module.ts constructor
      // We are using the built-in firestore function, transaction, to BOTH
      //   get a snapshot of our data and make any needed changes to it as well
      // transaction => : shorthand notation, note you may also see 'function(transaction) =>' elsewear
      this.afs.firestore.runTransaction(transaction => {
          
          // return : basically a Promise<result, error>
          //          Promise is unwrapped and the underlying data is handled with .then and .catch blocks below
          return transaction.get(<your AngularFirestoreDocument>.ref).then(doc => {
              
              if (!doc.exists) { throw "Document does not exist!"; }
              
              // Adjust parkinglot stats
              var newPopulation = doc.data().population + change;
              var newPctFull = Math.round((newPopulation / doc.data().capacity) * 100.00);
              transaction.update(<your AngularFirestoreDocument>.ref, { 
                  population: newPopulation, percentFull: newPctFull });
              
              // determine whether status (for ionic card, an ionic component, color) should be updated
              // TRUE - update, FALSE - nothing, no else
              var newStatus = (newPctFull >= 50 ? "secondary" : (newPctFull >= 25 ? "caution" : "danger"));
              if (newStatus != doc.data().status) {
                  transaction.update(this.plDocumentRef.ref, { status: newStatus });
              }
           });
      }).then(result => {
          console.log('FUNCTION updateParkingLotDocData Transaction success!');
      }).catch(error => {
          console.log('FUNCTION updateParkingLotDocData Transaction failure:', error);
      });
  }
  ```

### Getting COLLECTIONS and DOCUMENTS from Firebase
We kinda spoke about this in the ***aggregate data*** section above. We need to link local typescript objects from the app to our firestore objects. This allows for matched data types and observable listeners. There are several ways to do this, we chose a CRUD model and made several interface objects matching the Document data structure in our firestore database.
```ts
// A simple sample based on examples above 
export interface ParkingLotInterface {
    // MUST BE TYPE:  reference. of a location/doc
    centerLocation: firebase.firestore.DocumentReference,
    // IF 90 / 100 spaces are filled... 90% full
    percentFull: number,
    capacity: number,
    population: number,
    // used as a proper name for the parkinglot to define ionic card headers
    title: string,
    // used to define ionic card colors (visual ques for the user)
    status: string
}

```
#### Firebase Observables
These interfaces are imported to page ```module.ts``` files that use them. We assigned ```Observable<Inerfaces>``` to the ```AngularFirestore.DocumentReference```
```ts
// A simple sample based on examples above 
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ParkingLotInterface } from "../../shared/models/collections";
...

// Angular component for page setup
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
// OBSERVABLE
parkingLotObs: Observable<ParkingLotInterface[]>;
// COLLECTION REFERENCE
parkingLotCollectionRef: AngularFirestoreCollection<ParkingLotInterface>;
...

// CONSTRUCTOR
constructor(
    private afs: AngularFirestore, ...) {
        this.parkingLotCollectionRef = this.afs.collection('parkingLot');
        this.parkingLotObs = this.parkingLotCollectionRef.valueChanges();
}
...
```
The ***typescript*** feature for ```{{ interpolation }}``` comes really in handy here! We can use our typescript variables inside our html, displaying our observable firebase firestore data asyncronously!
```html
  <!-- A simple sample based on examples above -->
  <!-- this *ngFor shows the asyncronous data for each Document in our parkingLot Collection, so each parkinglot -->
  <div *ngFor="let lot of parkingLotObs | async">
    <!-- this *ngIf condition limits the ion cards to the data we want 
         if this condition is not met, none of the sub-level tags will be used -->
    <div *ngIf="lot.picture != 'tbd.png'">
      <ion-card color="{{ lot.status }}" (click)="goToHLotPage()">
        <ion-card-header>
            {{ lot.title }}<br>
            <img src="assets/images/{{ lot.picture }}" alt="parkinglot image">
        </ion-card-header>
        <ion-card-content>
            <ion-row>
              <ion-col col-4 class="cardPercentage">{{ lot.plFullPct }}%</ion-col>
            </ion-row>
        </ion-card-content>
      </ion-card>
    </div>
  </div>
```
So, any updates any user makes to a parkinglot will be shared across all linked devices using our app!

#### Firebase Queries
We used a specific query using the ```Firebase Authenticated user``` email in order to query 1 user result from our ```Collection user```

```js
var userQuery = firebase.firestore().collection('/user').where('email', '==', userEmail);
userQuery.get().then(querysnapshot => {
    var result = querysnapshot.docs.pop();
    this.setUser(result.id);
});
```

## Plugin Explanations
//Todo

## Running the app

### Installing Dependencies
```sh
npm i
``` 
1. If you look into the ```.gitignore``` file you will see that ```/platforms /plugins``` and ```/node_modules``` are excluded from the repository. That means that you need to install dependencies before building the project 
2. ```npm i``` is a shorthand way of installing all dependencies that are listed in ```package.json``` (run this in the directory of project)

### Buidling the app
```sh
ionic cordova build android
ionic cordova build ios
```
//Todo

### Serving the app
```sh
ionic serve
```
1. In the event of an app crash, serve the app to the browser for debugging purposes only
2. Since this app utilizes a lot of native functionalities, serving the application will not display the google maps plugin so it is recommended to test all changes on an actual device or an emulator

### Running on Android
```sh
ionic cordova run android --device
```
1. Make sure device is plugged in
2. Make sure device is running Android 7.00 or higher

### Runnnig on iOS
//Todo

## Deployment
Ideally the application should be deployed on the Google Play Store for Android and the App Store for iOS but if the application cannot pass the requirements that each market requires then you may use alternative methods to deploy the application. 

### Android Deployment
1. Android APK's are easier to distribute and install than iOS because as long as the device has developer mode on and allows APK's from unknown sources
2. We used a Github Page to deploy our app at STaRS
3. https://grizzlyparking.github.io/ (May be an older APK)

### iOS Deployment
//Todo

## Troubleshooting
Android components and plugins update ***frequently***. If you run into a problem **DO NOT DELETE FOLDERS RELATED TO ANDROID!**. These, like most _installed_ apps or modules have rooted reach into your app. You need to uninstall to fix. There were a few occasions we needed to do the following:    
1. Open the Node.js command prompt as administrator. Run the follonw commands in order.  
   ```sh
   npm cache clean --force 
   npm uninstall -g ionic
   npm uninstall -g cordova
   npm install -g ionic
   npm install -g cordova
   ```  
2. From the project folder (I used git bash)  
   ```sh
   ionic cordova platform remove android
   ionic cordova platform add android
   ```  
   * You may need to specify a specific android version, depending on Cordova's current compatability listed in their docs. This is the current guideline:
   `ionic cordova platform add android@6.x`
3. You may also need to check gradle, which we maintained through Android Studio.

## Team Members
* Joshua Tran - [GitHub](https://github.com/jtran6) &nbsp; [LinkedIn](https://www.linkedin.com/in/joshua-tran-9700a8118/)
* Luca Parilli - [GitHub]() &nbsp; [LinkedIn](https://www.linkedin.com/in/gianluca-parilli-608421151/)
* Chelsea D'Alessandro - [GitHub](https://github.com/chelCcat) &nbsp; [LinkedIn](https://www.linkedin.com/in/chelsea-d-alessandro-bb5581155/)
