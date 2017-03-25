
var Firebase = require("firebase");
var patients = new Firebase("https://wearhackskw2017.firebaseio.com/patients");
var perscriptions = new Firebase("https://wearhackskw2017.firebaseio.com/perscriptions");


PerscriptionID = 0;

function schedule(interval, duration, time){
    var Schedule = {
        Interval: interval,
        Duration: duration,
        Start: time(8,0),
    }
    if (time){
        Schedule.Start = time;
    }
    else{
        Schedule.Start = time(8,0);
        Schedule.Count = Math.ceil(24/interval.Hour)-1;
    }
    return Schedule;
}

function createPatient(id, name, number, age, method){
    patients.ref().set({HealthCard: id});
    patients.ref(id).set({
        Name: name,
        Phone: number,
        Age: age,
        Method: method
    });
}

function createPerscription(id, name, detail, schedule){
    perscriptions.ref().set({ID: PerscriptionID});
    perscriptions.ref(PerscriptionID).set({
        PatiendID: id,
        Name: name,
        Detail: detail,
        Schedule: schedule,
        Count: 0
    });
    PerscriptionID ++;
}

function getPhoneNumber(id, callback){
    patients.ref(id + "/Phone/").once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPatientName(id, callback){
    patients.ref(id + "/Name/").once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPerscriptionName(id, callback){
    perscriptions.ref(id + "/Name/").once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.valI());
        }
        else{
            callback();
        }
    });
}

function getPatient(id, callback){
    patients.ref().once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPerscription(id, callback){
    perscriptions.ref().once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}



