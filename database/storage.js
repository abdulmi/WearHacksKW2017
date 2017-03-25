
var Firebase = require("firebase");
var patients = new Firebase("https://wearhackskw2017.firebaseio.com/patients");
var perscriptions = new Firebase("https://wearhackskw2017.firebaseio.com/perscriptions");


PerscriptionID = 0;

function schedule(frequency, duration, time){
    var Schedule = {
        Frequency: frequency,
        Duration: duration,
        Interval: 1440, //Default 24 hours (1/day)
        Start: 480,   //Minutes
    }
    if (time){
        Schedule.Start = time;  //Minutes
    }
    else{
        Schedule.Start = 480;
        Schedule.duration -= Math.ceil(frequency/2);    //This will assume half of the pills have been taken on the day perscribed
    }
    Schedule.Interval = Math.floor((24*60-Schedule.start)/(frequency-1));

    var s = Schedule.Start*60*1000;
    var d = new Date();
    d = d.getTime();
    d += 86400000;
    d = d - d.getMilliseconds() - d.getSeconds()*1000 - d.getMinutes()*60*1000 - d.getHours()*60*60*1000;
    Schedule.Start = s + d; //In theory, sets start time to epoch time

    return Schedule;
}

//Returns the Epoch time of the time it is looking out for
function getEpochPerscription(perscription, callback){
    var time = perscription.Schedule.Start;
    var c = perscription.Count;
    var f = perscription.Schedule.Frequency;
    var i = perscription.Schedule.Interval;
    time = time + Math.floor(c/f) + i*(c%f);
    if (time){
        callback(time);
    }
    else{
        callback();
    }
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



