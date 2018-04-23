// INTERFACE  |  COLLECTION - LOCATION
export interface LocationInterface {
    lat: number,
    long: number
}

// INTERFACE  |  COLLECTION - USER
export interface UserInterface {
    isParked: boolean,
    //MUST BE TYPE:  reference. of a location/doc
    parkedLocation: firebase.firestore.DocumentReference,
    //MUST BE TYPE:  reference. of a parkingLot/doc
    parkedLot: firebase.firestore.DocumentReference,
    //MUST BE TYPE:  TimeStamp. a number represents millisecs since 01/01/1970
    parkedTime: firebase.firestore.FieldValue,
    email: string
}

// INTERFACE  |  COLLECTION - PARKINGLOT
export interface ParkingLotInterface {
    //MUST BE TYPE:  reference. of a location/doc
    geoFence: firebase.firestore.DocumentReference,
    plAvailablePct: number,
    plCapacity: number,
    plPopulation: number
}

// INTERFACE | COLLECTION - SurveyTimes
export interface SurveyTimeInterface {
    userID : firebase.firestore.FieldValue,
    startTime: firebase.firestore.FieldValue,
    endTime: firebase.firestore.FieldValue,
    timeSubmitted: firebase.firestore.FieldValue
}

export interface ReportBugInterface {
    userID : firebase.firestore.FieldValue,
    timeSubmitted: firebase.firestore.FieldValue,
    platform: firebase.firestore.FieldValue,
    version: firebase.firestore.FieldValue,
    model : firebase.firestore.FieldValue,
    manufacturer: firebase.firestore.FieldValue,
    bug : firebase.firestore.FieldValue
}