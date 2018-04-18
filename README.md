# Grizzly Parking

An Ionic parking app that helps ease the flow of traffic on GGC's campus and helps students find available parking during school hours.

## Project Description
<ol>
    <li>Uses Google Firebase Authentication to register and verify users(@ggc.edu addresses only)</li>
    <li>Uses Google Firebase Firesore as DB solution</li>
    <li>Uses Ionic-Native plugins to keep track of users(Geofence, Geolocation)</li>

</ol>
 
## Quick Start

### Make sure you are familiar with how Ionic 3 works
1. ```Lynda.com``` offers some Ionic 2 courses which is very similar to Ionic 3. 
2. Ionic 3 implements ```"Lazy Loading"``` which is a new way for Ionic to only load the neccessary .ts files when needed
3. Ionic 3 is written in ```Typescript``` and uses ```Angular``` as a framework for the front end
4. https://ionicframework.com/docs/

### Make sure you are familiar with noSQL and Firebase
1. This app utilizes Google's BaaS Firebase which handles ```AUTHENTICATION, DATABASE, FILE STORAGE``` and ```CLOUD FUNCTIONS```
2. We used ```AngularFire2``` (npm package) to allow the app to communicate with the ```Firebase SDK``` for ```WEB APPLICATIONS```
3. The ```Firebase Credentials``` for the application are located within ```src/app/config.ts``` this file holds all of the keys that associated with the Firebase Application 
4. Google's Firebase Console is the main way to see everything that your app needs to run correctly
5. Firebase Docs - https://firebase.google.com/docs/
6. AngularFire2 Docs - https://github.com/angular/angularfire2/blob/master/docs/ionic/v3.md

### We recommend using Visual Studio Code
1. VS Code offers support for Ionic with third-party extensions
2. Ease of use
3. UI customization
4. Integrated Terminal (ctrl + `)
    1. Git
    2. Ionic CLI
5. https://code.visualstudio.com/Download

## Code Base Explanation

### Adding a new page
1. Use Ionic's CLI to generate new pages
2. ```ionic -g page yourPageName```
3. Since Ionic 3 uses ```"Lazy Loading"``` it will create a new folder with it's own ```module.ts```
4. In order for the application to recognize the new page, you must inject the exported class from your newly generated page into the ```app.module.ts``` under ```DEPENDENCIES``` and ```ENTRY COMPONENTS```

### Page Navigation
1. Ionic uses a ```STACK``` as a data structure for the ```UI```
2. ```Pushing``` a new page will place it on top of the current page; meaning that pressing back will go back to the previous page by ```popping``` current page.
3. ```this.navCtrl.push(YourPageClass);```
### Using TypeScript variables within the HTML files
1. You can escape HTML and insert TypeScript code by using: ```{{ yourTypeScriptVariableHere }}```
2. ```<a href="#">{{ typeScriptVariable }}</a>```

### How Firebase connects with the app
1. ```src/app/config.ts``` holds all Firebase credentials
2. ```src/app/app.module.ts``` holds the code that initializes Firebase
<br>```imports: [```<br>
    ```AngularFireModule.initializeApp(credentials.firebase),``` <br>
    ```AngularFirestoreModule.enablePersistence(),```<br>
    ```AngularFireAuthModule,```<br>
    ```AngularFireDatabaseModule]```
### Firebase Authentication
1. Import correct dependencies at the top of the TypeScript file <br>
```import { AuthProvider } from '../../providers/auth/auth';```<br>
```import { AngularFireAuth } from 'angularfire2/auth';```<br>
2. Make sure you have injected a parameter within the constructor of the TypeScript file you are working on so that you can use Firebase
``` constructor(public afAuth : AngularFireAuth){ this.variable = this.afAuth.getID }```
### Getting COLLECTIONS and DOCUMENTS from Firebase
//Todo
#### Firebase Observables
//Todo
#### Firebase Queries
//Todo
## Database Structure Explanation
//Todo
## Plugin Explanations
//Todo
## Running the app
### Installing Dependencies
1. If you look into the ```.gitignore``` file you will see that ```/platforms /plugins``` and ```/node_modules``` are excluded from the repository. That means that you need to install dependencies before building the project
2. ```npm i``` is a shorthand way of installing all dependencies that are listed in ```package.json``` (run this in the directory of project)

### Buidling the app
//Todo
### Serving the app
//Todo
### Running on Android
//Todo
### Runnnig on iOS
//Todo
## Team Members

<ul>
    <li>Joshua Tran -
  <a href="https://github.com/jtran6">Github</a> |
  <a href="https://www.linkedin.com/in/joshua-tran-9700a8118/">LinkedIn</a>
    </li>
    <li>Luca Parilli
    </li>
    <li>Chelsea D'Alessandro
    </li>
</ul>

