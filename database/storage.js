var Firebase = firebase.database().ref();
var patients = firebase.database().ref('patients');
var perscriptions = firebase.database().ref('perscriptions');


PerscriptionID = 0;

function schedule(frequency, duration, time){
    var Schedule = {
        Frequency: frequency,
        Duration: 1440, //default 24 hours (1/day)
        Start: 480  //Minutes
    }
    if (time){
        Schedule.Start = time;
    }
    else{
        Schedule.Start = 480;
        Schedule.Duration -= Math.ceil(frequency/2);    //Assume half the pills have been taken the day of
    }
    Schedule.Interval = Math.floor((24*60-Schedule.start)/(frequency-1));

    var s = Schedule.Start*60*1000;
    var d = new Date();
    d = d.getTime();
    d += 86400000;
    d= d - d.getMilliseconds() - d.getSeconds()*1000 - d.getMinutes()*60*1000 - d.getHours()*60*60*1000;
    Schedule.Start = s+d;   //In theory, sets time to Epoch time

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
    // patients.set({HealthCard: id});
    patients.child(id).set({
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
    patients.child(id + "/Phone/").once("value").then(function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPatientName(id, callback){
    patients.child(id + "/Name").once("value").then(function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPerscriptionName(id, callback){
    perscriptions.child(id + "/Name").once("value").then(function(snapshot){
        if (snapshot.val()){
            callback(snapshot.valI());
        }
        else{
            callback();
        }
    });
}

function getPatient(id, callback){
    patients.child(id).once("value").then(function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPerscription(id, callback){
    perscriptions.child(id).once("value").then(function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getAllPatients(callback){
    patients.once("value").then(function(snapshot){
        var i = 0;
        var pats = {};
        snapshot.forEach(function(childSnapshot){
            pats[i++] = childSnapshot.val();
        });
        callback(pats);
    }
}
