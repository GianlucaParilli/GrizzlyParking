import { Injectable } from "@angular/core";
import { Geofence } from '@ionic-native/geofence';


@Injectable()
export class geofenceProvider {
  private geofences: Geofence[];
  public geo:Geofence;

  create(attributes) {
    const defaultGeofence = {
      id: 11,
      latitude: 50,
      longitude: 50,
      radius: 1000,
      transitionType: this.geo.TransitionType.ENTER,
      notification: {
        id: 1,
        title: "Ionic geofence example",
        text: "",
        icon: "res://ic_menu_mylocation",
        openAppOnClick: true,
      },
    };

    return Object.assign(defaultGeofence, attributes);
  }

  clone(geofence: Geofence) {
    return JSON.parse(JSON.stringify(geofence));
  }



  findAll() {
    return this.geo.getWatched()
      .then((geofencesJson) => {
        const geofences = JSON.parse(geofencesJson);

        this.geofences = geofences;
        return geofences;
      });
  }


  removeAll() {
    return this.geo.removeAll().then(() => {
      this.geofences.length = 0;
    });
  }

  remove(geofence) {
    return this.geo.remove(geofence.id).then(() => {
      this.geofences.splice(this.geofences.indexOf(geofence), 1);
    });
  }


}